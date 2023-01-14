import {
  Button,
  Card,
  CardBody,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Tab,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Spinner,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import Layout from '../../components/layout';
import DebitCard from './images/rhb-debit.png';
import CreditCard from './images/rhb-credit.jpg';
import { PieChart, Pie, Cell, ResponsiveContainer, LabelList } from 'recharts';
import { useContainerDimensions } from '../../hooks/useContainerDimensions';
import { useCalculations } from '../../hooks/useCalculations';
import { useTransactions } from '../../hooks/useTransactions';
import { useWallets } from '../../hooks/useWallets';
import _ from 'lodash';

const parseAmount = (amount, categoryType) => {
  if (categoryType === 'expense') {
    return `-${amount.toFixed(2)}`;
  } else {
    return `+${amount.toFixed(2)}`;
  }
};

const Wallet = () => {
  const { wallets, isLoading: walletsIsLoading } = useWallets();
  const [selectedWallet, setSelectedWallet] = useState({});
  const initialBalance =
    selectedWallet > 0 ? selectedWallet.initial_balance : 0;
  const [filteredCategories, setFilteredCategories] = useState([]);
  const { transactions, allTransactionsByWallet, isLoading } = useTransactions(
    selectedWallet.id,
    filteredCategories
  );
  const { totalBalance, totalIncome, totalExpense, nettChange } =
    useCalculations(initialBalance, transactions);

  const handleWalletChange = e => {
    setSelectedWallet(wallets.find(w => w.id === parseInt(e.target.value)));
  };
  const transactionsGroupedByDate = _.groupBy(
    transactions,
    transaction => transaction.date
  );
  console.log(transactionsGroupedByDate);
  const dateKeysSorted = Object.keys(transactionsGroupedByDate).sort(function (
    a,
    b
  ) {
    return b - a;
  });
  console.log(dateKeysSorted);

  const transactionsGroupedByExpenseOrIncome = _.groupBy(
    transactions,
    transaction => transaction.categories.type
  );
  console.log(transactionsGroupedByExpenseOrIncome);

  const expenseTransactionsGroupedByCategory = _.groupBy(
    transactionsGroupedByExpenseOrIncome.expense,
    transaction => transaction.categories.name
  );
  const incomeTransactionsGroupedByCategory = _.groupBy(
    transactionsGroupedByExpenseOrIncome.income,
    transaction => transaction.categories.name
  );
  const expenseTransactionsInfo = Object.keys(
    expenseTransactionsGroupedByCategory
  )
    .map(key => {
      return {
        name: key,
        totalAmount: expenseTransactionsGroupedByCategory[key].reduce(
          (a, b) => a + b.amount,
          0
        ),
        totalTransactions: expenseTransactionsGroupedByCategory[key].length,
      };
    })
    .sort((a, b) => b.totalAmount - a.totalAmount);
  console.log(expenseTransactionsInfo);

  const incomeTransactionsInfo = Object.keys(
    incomeTransactionsGroupedByCategory
  )
    .map(key => {
      return {
        name: key,
        totalAmount: incomeTransactionsGroupedByCategory[key].reduce(
          (a, b) => a + b.amount,
          0
        ),
        totalTransactions: incomeTransactionsGroupedByCategory[key].length,
      };
    })
    .sort((a, b) => b.totalAmount - a.totalAmount);
  console.log(incomeTransactionsInfo);

  useEffect(() => {
    if (wallets.length > 0 && !walletsIsLoading) {
      setSelectedWallet(wallets[0]);
    }
  }, [walletsIsLoading, wallets]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const tabsRef = useRef();
  const { width } = useContainerDimensions(tabsRef);

  const COLORS = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#FF0000',
    '#0000FF',
    '#00FF00',
    '#FFFF00',
    '#FF00FF',
    '#000000',
  ];

  return (
    <Layout>
      {!walletsIsLoading && !isLoading ? (
        <Flex gap="30px" direction="row">
          <Flex gap="25px" direction="column" w="40%">
            <Select value={selectedWallet.id} onChange={handleWalletChange}>
              {wallets.map(wallet => (
                <option key={wallet.id} value={wallet.id}>
                  {wallet.name}
                </option>
              ))}
            </Select>
            {selectedWallet.id === 1 ? (
              <Image src={DebitCard} alt="rhb debit card" />
            ) : selectedWallet.id === 2 ? (
              <Image src={CreditCard} alt="rhb credit card" />
            ) : null}
            <Tabs isFitted variant="enclosed" ref={tabsRef}>
              <TabList mb="1em">
                <Tab>Income</Tab>
                <Tab>Expense</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <ResponsiveContainer width={width} height={300}>
                    <PieChart width="100%" height="100%">
                      <Pie
                        data={incomeTransactionsInfo}
                        cx="50%"
                        cy="50%"
                        // labelLine={true}
                        // labelKey="name"
                        // label
                        // label={renderCustomizedLabel}
                        innerRadius={40}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="totalAmount"
                      >
                        {incomeTransactionsInfo.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                        <LabelList
                          dataKey="name"
                          position="outside"
                          offset={15}
                        />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <TableContainer>
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th>Category</Th>
                          <Th># of Transactions</Th>
                          <Th isNumeric>Total</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {incomeTransactionsInfo.map(transaction => (
                          <Tr key={transaction.name}>
                            <Td>{transaction.name}</Td>
                            <Td>{transaction.totalTransactions}</Td>
                            <Td isNumeric>
                              {transaction.totalAmount.toFixed(2)}
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </TabPanel>
                <TabPanel>
                  <ResponsiveContainer width={width} height={300}>
                    <PieChart width="100%" height="100%">
                      <Pie
                        data={expenseTransactionsInfo}
                        cx="50%"
                        cy="50%"
                        // labelLine={true}
                        // labelKey="name"
                        // label
                        // label={renderCustomizedLabel}
                        innerRadius={40}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="totalAmount"
                      >
                        {expenseTransactionsInfo.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                        <LabelList
                          dataKey="name"
                          position="outside"
                          offset={10}
                        />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <TableContainer>
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th>Category</Th>
                          <Th># of Transactions</Th>
                          <Th isNumeric>Total</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {expenseTransactionsInfo.map(transaction => (
                          <Tr key={transaction.name}>
                            <Td>{transaction.name}</Td>
                            <Td>{transaction.totalTransactions}</Td>
                            <Td isNumeric>
                              {transaction.totalAmount.toFixed(2)}
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
          <Flex gap="25px" direction="column" wrap={true} w="60%">
            <Flex gap="25px" direction="column" w="100%">
              <Button
                onClick={onOpen}
                colorScheme="blue"
                variant="solid"
                alignSelf="self-end"
              >
                Add New Wallet
              </Button>
            </Flex>

            <Modal onClose={onClose} isOpen={isOpen} isCentered>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>Add new transaction</ModalBody>
                <ModalFooter>
                  <Button onClick={onClose}>Close</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            <Flex gap="25px" direction="row" wrap={true} w="100%">
              <Card w="50%">
                <Stat>
                  <CardBody>
                    <StatLabel>Total Balance</StatLabel>
                    <StatNumber>{`MYR ${totalBalance.toFixed(2)}`}</StatNumber>
                    <StatHelpText>Jan 1 - Jan 31</StatHelpText>
                  </CardBody>
                </Stat>
              </Card>
              <Card w="50%">
                <Stat>
                  <CardBody>
                    <StatLabel>Nett Change</StatLabel>
                    <StatNumber>{`MYR ${nettChange.toFixed(2)}`}</StatNumber>
                    <StatHelpText>Jan 1 - Jan 31</StatHelpText>
                  </CardBody>
                </Stat>
              </Card>
            </Flex>

            <Flex gap="25px" direction="row" wrap={true} w="100%">
              <Card w="50%">
                <Stat>
                  <CardBody>
                    <StatLabel>Income</StatLabel>
                    <StatNumber>{`MYR ${totalIncome.toFixed(2)}`}</StatNumber>
                    <StatHelpText>Jan 1 - Jan 31</StatHelpText>
                  </CardBody>
                </Stat>
              </Card>
              <Card w="50%">
                <Stat>
                  <CardBody>
                    <StatLabel>Expense</StatLabel>
                    <StatNumber>{`MYR ${totalExpense.toFixed(2)}`}</StatNumber>
                    <StatHelpText>Jan 1 - Jan 31</StatHelpText>
                  </CardBody>
                </Stat>
              </Card>
            </Flex>

            <Card mb={10}>
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr bg="gray.200">
                      <Th borderRadius="0.375rem 0 0 0">Category</Th>
                      <Th>Description</Th>
                      <Th isNumeric borderRadius="0 0.375rem 0 0">
                        Amount
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {dateKeysSorted.map(dateKey => {
                      return (
                        <>
                          <Tr bg="gray.100">
                            <Th>{dateKey.split('-').reverse().join('/')}</Th>
                            <Th></Th>
                            <Th></Th>
                          </Tr>
                          {transactionsGroupedByDate[dateKey].map(
                            transaction => (
                              <Tr>
                                <Td>{transaction.categories.name}</Td>
                                <Td>{transaction.description}</Td>
                                <Td isNumeric>
                                  {parseAmount(
                                    transaction.amount,
                                    transaction.categories.type
                                  )}
                                </Td>
                              </Tr>
                            )
                          )}
                        </>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </Card>
          </Flex>
        </Flex>
      ) : (
        <Flex
          w="100%"
          marginTop="30vh"
          justifyContent="center"
          alignItems="center"
        >
          <Spinner
            size="xl"
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="secondaryBlue"
          />
        </Flex>
      )}
    </Layout>
  );
};

export default Wallet;
