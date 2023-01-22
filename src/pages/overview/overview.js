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
  Spinner,
  Select,
  FormControl,
  FormLabel,
  VStack,
  Box,
  Input,
  NumberInput,
  NumberInputField,
  Tag,
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import Layout from '../../components/layout';
import { PieChart, Pie, Cell, ResponsiveContainer, LabelList } from 'recharts';
import { useContainerDimensions } from '../../hooks/useContainerDimensions';
import { useCalculations } from '../../hooks/useCalculations';
import _ from 'lodash';
import { useAllTransactions } from '../../hooks/useAllTransactions';
import supabase from '../../supabaseClient';
import { useSelector } from 'react-redux';

const parseAmount = (amount, categoryType) => {
  if (categoryType === 'expense') {
    return `-${amount.toFixed(2)}`;
  } else {
    return `+${amount.toFixed(2)}`;
  }
};

const Overview = () => {
  const categories = useSelector(state => state.category);

  const {
    allTransactions: transactions,
    totalBalance: initialBalance,
    isLoading,
    setAllTransactions,
  } = useAllTransactions();
  const { totalBalance, totalIncome, totalExpense, nettChange } =
    useCalculations(initialBalance, transactions);

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

  const transactionsGroupedByExpenseOrIncome = _.groupBy(
    transactions,
    transaction => transaction.categories.type
  );

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

  const todayDate = new Date();
  const offset = todayDate.getTimezoneOffset();
  const [date, setDate] = useState(
    new Date(todayDate.getTime() - offset * 60 * 1000)
      .toISOString()
      .split('T')[0]
  );
  const [wallet, setWallet] = useState('1');
  const [selectType, setSelectType] = useState('expense');
  const [selectCategory, setSelectCategory] = useState('1');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0.0);

  const handleDate = e => {
    console.log(e.target.value);
    setDate(e.target.value);
  };

  const handleWallet = e => {
    console.log(e.target.value);
    setWallet(e.target.value);
  };

  const handleSelectType = e => {
    console.log(e.target.value);
    setSelectType(e.target.value);
  };

  const handleSelectCategory = e => {
    console.log(e.target.value);
    setSelectCategory(e.target.value);
  };

  const handleDescription = e => {
    setDescription(e.target.value);
  };

  const handleAmount = e => {
    console.log(e.target.value);
    setAmount(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('submit');
    const { data } = await supabase
      .from('transactions')
      .insert({
        wallet_id: wallet,
        date: date,
        category_id: selectCategory,
        description: description,
        amount: amount,
      })
      .select(`*, categories (*), wallets (*)`);
    setWallet('1');
    setSelectType('expense');
    setSelectCategory('1');
    setDescription('');
    setAmount(0.0);
    setAllTransactions([data[0], ...transactions]);
    onClose();
  };

  return (
    <Layout>
      {!isLoading ? (
        <Flex gap="30px" direction="column">
          <Flex gap="25px" direction="row" w="100%">
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>You're spending too much on cafes!</AlertTitle>
              <AlertDescription>
                Do not indulge in expensive cafes or restaurants all the time.
              </AlertDescription>
            </Alert>
            <Button
              onClick={onOpen}
              colorScheme="blue"
              variant="solid"
              alignSelf="self-end"
            >
              Add Transaction
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
            <Flex gap="25px" direction="column" w="40%">
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
                <ModalHeader>Add Transaction</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <FormControl>
                    <VStack spacing={4}>
                      <Box alignItems="left" width="100%">
                        <FormLabel fontSize="sm">Date</FormLabel>
                        <Input
                          onChange={handleDate}
                          placeholder="Select Date"
                          type="date"
                          value={date}
                        />
                      </Box>
                      <Box alignItems="left" width="100%">
                        <FormLabel fontSize="sm">Wallet</FormLabel>
                        <Select onChange={handleWallet} value={wallet}>
                          <option value="1">RHB Savings Account-I</option>
                          <option value="3">Cash</option>
                        </Select>
                      </Box>
                      <Box alignItems="left" width="100%">
                        <FormLabel fontSize="sm">Type</FormLabel>
                        <Select onChange={handleSelectType} value={selectType}>
                          <option value="expense">Expense</option>
                          <option value="income">Income</option>
                        </Select>
                      </Box>
                      <Box alignItems="left" width="100%">
                        <FormLabel fontSize="sm">Category</FormLabel>
                        <Select
                          onChange={handleSelectCategory}
                          value={selectCategory}
                        >
                          {selectType === 'expense' ? (
                            <>
                              <option value="1">Food</option>
                              <option value="2">Transport</option>
                              <option value="3">Entertainment</option>
                              <option value="4">Shopping</option>
                              <option value="5">Others</option>
                            </>
                          ) : (
                            <>
                              <option value="6">Salary</option>
                              <option value="7">Allowance</option>
                              <option value="8">Others</option>
                            </>
                          )}
                        </Select>
                      </Box>
                      <Box alignItems="left" width="100%">
                        <FormLabel fontSize="sm">
                          Description (Optional)
                        </FormLabel>
                        <Input
                          placeholder="Write Description"
                          onChange={handleDescription}
                          value={description}
                        />
                      </Box>
                      <Box alignItems="left" width="100%">
                        <FormLabel fontSize="sm">Amount</FormLabel>
                        <NumberInput defaultValue={0} min={0} precision={2}>
                          <NumberInputField
                            onChange={handleAmount}
                            value={amount}
                          />
                        </NumberInput>
                      </Box>
                    </VStack>
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button
                    onClick={handleSubmit}
                    colorScheme="blue"
                    variant="solid"
                  >
                    Add Transaction
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <Flex gap="25px" direction="column" w="60%">
              <Card mb={10}>
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr bg="gray.200">
                        <Th borderRadius="0.375rem 0 0 0">Category</Th>
                        <Th>Wallet</Th>
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
                              <Th></Th>
                            </Tr>
                            {transactionsGroupedByDate[dateKey].map(
                              transaction => (
                                <Tr>
                                  <Td>
                                    <Tag
                                      colorScheme={
                                        categories.data.filter(
                                          category =>
                                            category.name ===
                                            transaction.categories.name
                                        )[0]
                                          ? categories.data.filter(
                                              category =>
                                                category.name ===
                                                transaction.categories.name
                                            )[0].color
                                          : 'red'
                                      }
                                    >
                                      {transaction.categories.name}
                                    </Tag>
                                  </Td>
                                  <Td>{transaction.wallets.name}</Td>
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

export default Overview;
