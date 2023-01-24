import {
  Button,
  Card,
  CardBody,
  Flex,
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
  Tag,
  Icon,
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import Layout from '../../components/layout';
import { PieChart, Pie, Cell, ResponsiveContainer, LabelList } from 'recharts';
import { useContainerDimensions } from '../../hooks/useContainerDimensions';
import { useTransactions } from '../../hooks/useTransactions';
import { useWallets } from '../../hooks/useWallets';
import _ from 'lodash';
import CategoriseModal from '../../components/categoriseModal';
import { FaCog } from 'react-icons/fa';
import { useCategories } from '../../hooks/useCategories';
import { useTotalBalance } from '../../hooks/useTotalBalance';

const parseAmount = (amount, categoryType) => {
  if (categoryType === 'expense') {
    return `-${amount.toFixed(2)}`;
  } else {
    return `+${amount.toFixed(2)}`;
  }
};

const Wallet = () => {
  const {
    data: wallets,
    isLoading: walletsAreLoading,
    refetch: refetchWallets,
  } = useWallets();
  const {
    data: categories,
    expenseCategories,
    incomeCategories,
    isLoading: categoriesAreLoading,
  } = useCategories();

  const defaultWalletId =
    !walletsAreLoading && wallets ? wallets[0].id : undefined;
  const [selectedWalletId, setSelectedWalletId] = useState(defaultWalletId);
  const {
    data: transactions,
    totalIncome,
    totalExpense,
    nettChange,
    incomeTransactionsGroupedByCategoryAndSorted,
    expenseTransactionsGroupedByCategoryAndSorted,
    uncategorizedTransactions,
    isLoading: transactionsAreLoading,
    refetch: refetchTransactions,
  } = useTransactions({ walletId: selectedWalletId });
  const {
    data: totalBalance,
    isLoading: totalBalanceIsLoading,
    refetch: refetchTotalBalance,
  } = useTotalBalance(undefined, selectedWalletId);
  const isLoading =
    walletsAreLoading ||
    categoriesAreLoading ||
    transactionsAreLoading ||
    totalBalanceIsLoading;

  const handleWalletChange = e => {
    setSelectedWalletId(parseInt(e.target.value));
  };
  const transactionsGroupedByDate = _.groupBy(
    transactions,
    transaction => transaction.date
  );
  const dateKeysSorted = Object.keys(transactionsGroupedByDate).sort(function (
    a,
    b
  ) {
    return b - a;
  });

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

  if (isLoading) {
    return (
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
    );
  }

  return (
    <Layout>
      <Flex direction="column" gap="30px">
        <CategoriseModal
          uncategorisedTransactions={uncategorizedTransactions}
          expenseCategories={expenseCategories}
          incomeCategories={incomeCategories}
          refetchData={refetchTransactions}
        />
        <Flex gap="30px" direction="row">
          <Flex gap="25px" direction="column" w="40%">
            <Select value={selectedWalletId} onChange={handleWalletChange}>
              {wallets.map(wallet => (
                <option key={wallet.id} value={wallet.id}>
                  {wallet.name}
                </option>
              ))}
            </Select>
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
                        data={incomeTransactionsGroupedByCategoryAndSorted}
                        cx="50%"
                        cy="50%"
                        // labelLine={true}
                        // labelKey="name"
                        // label
                        // label={renderCustomizedLabel}
                        innerRadius={40}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="amount"
                      >
                        {incomeTransactionsGroupedByCategoryAndSorted.map(
                          (entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          )
                        )}
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
                        {incomeTransactionsGroupedByCategoryAndSorted.map(
                          transaction => (
                            <Tr key={transaction.name}>
                              <Td>{transaction.name}</Td>
                              <Td>{transaction.count}</Td>
                              <Td isNumeric>{transaction.amount.toFixed(2)}</Td>
                            </Tr>
                          )
                        )}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </TabPanel>
                <TabPanel>
                  <ResponsiveContainer width={width} height={300}>
                    <PieChart width="100%" height="100%">
                      <Pie
                        data={expenseTransactionsGroupedByCategoryAndSorted}
                        cx="50%"
                        cy="50%"
                        // labelLine={true}
                        // labelKey="name"
                        // label
                        // label={renderCustomizedLabel}
                        innerRadius={40}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="amount"
                      >
                        {expenseTransactionsGroupedByCategoryAndSorted.map(
                          (entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          )
                        )}
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
                        {expenseTransactionsGroupedByCategoryAndSorted.map(
                          transaction => (
                            <Tr key={transaction.name}>
                              <Td>{transaction.name}</Td>
                              <Td>{transaction.count}</Td>
                              <Td isNumeric>{transaction.amount.toFixed(2)}</Td>
                            </Tr>
                          )
                        )}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
          <Flex gap="25px" direction="column" wrap={true} w="60%">
            <Flex gap="25px" direction="column" w="100%">
              <Flex
                gap="25px"
                direction="row"
                alignSelf="self-end"
                alignItems="center"
              >
                <Button>Add Transaction</Button>
                <Icon
                  onClick={onOpen}
                  as={FaCog}
                  w="2rem"
                  h="2rem"
                  cursor="pointer"
                  padding="0.25rem"
                  marginRight="1rem"
                />
              </Flex>
            </Flex>

            <Modal onClose={onClose} isOpen={isOpen} isCentered>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Wallet Settings</ModalHeader>
                <ModalCloseButton />
                <ModalBody>Favourite</ModalBody>
                <ModalFooter>
                  <Button onClick={onClose}>Close</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            <Flex gap="25px" direction="row" wrap={true} w="100%">
              <Card
                w="50%"
                borderRadius="0 0 0.375rem 0.375rem"
                borderTop="3px solid"
                borderTopColor="purple.300"
              >
                <Stat>
                  <CardBody>
                    <StatLabel>Total Balance</StatLabel>
                    <StatNumber>{`MYR ${totalBalance.toFixed(2)}`}</StatNumber>
                    <StatHelpText>Jan 1 - Jan 31</StatHelpText>
                  </CardBody>
                </Stat>
              </Card>
              <Card
                w="50%"
                borderRadius="0 0 0.375rem 0.375rem"
                borderTop="3px solid"
                borderTopColor="blue.300"
              >
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
              <Card
                w="50%"
                borderRadius="0 0 0.375rem 0.375rem"
                borderTop="3px solid"
                borderTopColor="green"
              >
                <Stat>
                  <CardBody>
                    <StatLabel>Income</StatLabel>
                    <StatNumber color="green">{`MYR ${totalIncome.toFixed(
                      2
                    )}`}</StatNumber>
                    <StatHelpText>Jan 1 - Jan 31</StatHelpText>
                  </CardBody>
                </Stat>
              </Card>
              <Card
                w="50%"
                borderRadius="0 0 0.375rem 0.375rem"
                borderTop="3px solid"
                borderTopColor="red.500"
              >
                <Stat>
                  <CardBody>
                    <StatLabel>Expense</StatLabel>
                    <StatNumber color="red.700">{`MYR ${totalExpense.toFixed(
                      2
                    )}`}</StatNumber>
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
                                <Td>
                                  <Tag
                                    colorScheme={transaction.categories.color}
                                  >
                                    {transaction.categories.name}
                                  </Tag>
                                </Td>
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
      </Flex>
    </Layout>
  );
};

export default Wallet;
