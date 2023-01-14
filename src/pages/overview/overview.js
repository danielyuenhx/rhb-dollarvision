import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
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
} from '@chakra-ui/react';
import React, { useRef } from 'react';
import Layout from '../../components/layout';
import { PieChart, Pie, Cell, ResponsiveContainer, LabelList } from 'recharts';
import { useContainerDimensions } from '../../hooks/useContainerDimensions';
import { useCalculations } from '../../hooks/useCalculations';
import _ from 'lodash';
import { useAllTransactions } from '../../hooks/useAllTransactions';

const parseAmount = (amount, categoryType) => {
  if (categoryType === 'expense') {
    return `-${amount.toFixed(2)}`;
  } else {
    return `+${amount.toFixed(2)}`;
  }
};

const Overview = () => {
  const {
    allTransactions: transactions,
    totalBalance: initialBalance,
    isLoading,
  } = useAllTransactions();
  const { totalBalance, totalIncome, totalExpense, nettChange } =
    useCalculations(initialBalance, transactions);

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
      {!isLoading && (
        <Flex gap="30px" direction="column">
          <Flex gap="25px" direction="row" w="100%">
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>You're spending too much on cafes!</AlertTitle>
              <AlertDescription>
                Do not indulge in expensive cafes or restaurant all the time.
              </AlertDescription>
            </Alert>
            <Button
              onClick={onOpen}
              colorScheme="blue"
              variant="solid"
              alignSelf="self-end"
            >
              Add New Transaction
            </Button>
          </Flex>
          <Flex gap="25px" direction="row" wrap={true} w="100%">
            <Card w="25%">
              <Stat>
                <CardBody>
                  <StatLabel>Total Balance</StatLabel>
                  <StatNumber>{`MYR ${totalBalance.toFixed(2)}`}</StatNumber>
                  <StatHelpText>Jan 1 - Jan 31</StatHelpText>
                </CardBody>
              </Stat>
            </Card>
            <Card w="25%">
              <Stat>
                <CardBody>
                  <StatLabel>Nett Change</StatLabel>
                  <StatNumber>{`MYR ${nettChange.toFixed(2)}`}</StatNumber>
                  <StatHelpText>Jan 1 - Jan 31</StatHelpText>
                </CardBody>
              </Stat>
            </Card>
            <Card w="25%">
              <Stat>
                <CardBody>
                  <StatLabel>Total Income</StatLabel>
                  <StatNumber>{`MYR ${totalIncome.toFixed(2)}`}</StatNumber>
                  <StatHelpText>Jan 1 - Jan 31</StatHelpText>
                </CardBody>
              </Stat>
            </Card>
            <Card w="25%">
              <Stat>
                <CardBody>
                  <StatLabel>Total Expense</StatLabel>
                  <StatNumber>{`MYR ${totalExpense.toFixed(2)}`}</StatNumber>
                  <StatHelpText>Jan 1 - Jan 31</StatHelpText>
                </CardBody>
              </Stat>
            </Card>
          </Flex>
          <Flex gap="25px" direction="row" wrap={true} w="100%">
            <Flex gap="25px" direction="column" w="35%">
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
            <Flex gap="25px" direction="column" w="65%">
              <Card mb={10}>
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Category</Th>
                        <Th>Description</Th>
                        <Th isNumeric>Amount</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {dateKeysSorted.map(dateKey => {
                        return (
                          <>
                            <Tr>
                              <Th fontSize={16}>
                                {dateKey.split('-').reverse().join('/')}
                              </Th>
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
        </Flex>
      )}
    </Layout>
  );
};

export default Overview;
