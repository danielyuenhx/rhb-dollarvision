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
  Text,
  FormLabel,
  VStack,
  Box,
  Input,
  NumberInput,
  NumberInputField,
  Tag,
  IconButton,
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import Layout from '../../components/layout';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LabelList,
  Tooltip,
} from 'recharts';
import { useContainerDimensions } from '../../hooks/useContainerDimensions';
import _ from 'lodash';
import supabase from '../../supabaseClient';
import CategoriseModal from '../../components/categoriseModal';
import { useTransactions } from '../../hooks/useTransactions';
import { useCategories } from '../../hooks/useCategories';
import { useTotalBalance } from '../../hooks/useTotalBalance';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import {
  firstDayOfMonth,
  lastDayOfMonth,
  setNextMonth,
  setPreviousMonth,
  today,
} from '../../helpers';
import SankeyModal from './sankeyModal';

const parseAmount = (amount, categoryType) => {
  if (categoryType === 'expense') {
    return `-${amount.toFixed(2)}`;
  } else {
    return `+${amount.toFixed(2)}`;
  }
};

const Overview = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(firstDayOfMonth);
  const [selectedEndDate, setSelectedEndDate] = useState(lastDayOfMonth);
  const rightButtonDisabled =
    today.getMonth() === new Date(selectedStartDate).getMonth() &&
    today.getFullYear() === new Date(selectedStartDate).getFullYear();
  const month = new Date(selectedStartDate).toLocaleString('default', {
    month: 'short',
  });
  const firstDateOfMonth = new Date(selectedStartDate).getDate();
  const lastDateOfMonth = new Date(selectedEndDate).getDate();
  const dateRange = `${month} ${firstDateOfMonth} - ${month} ${lastDateOfMonth}`;

  // pass in parameters like this https://masteringjs.io/tutorials/fundamentals/parameters
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
  } = useTransactions({
    startDate: selectedStartDate,
    endDate: selectedEndDate,
  });
  const {
    incomeCategories,
    expenseCategories,
    isLoading: categoriesAreLoading,
  } = useCategories();
  const {
    data: totalBalance,
    totalBalancePrevMonth,
    isLoading: totalBalanceIsLoading,
    refetch: refetchTotalBalance,
  } = useTotalBalance(selectedStartDate, selectedEndDate);

  const isLoading =
    transactionsAreLoading || categoriesAreLoading || totalBalanceIsLoading;

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
    setDate(e.target.value);
    console.log(e.target.value)
  };

  const handleWallet = e => {
    setWallet(e.target.value);
  };

  const handleSelectType = e => {
    setSelectType(e.target.value);
  };

  const handleSelectCategory = e => {
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
    console.log(data);
    setWallet('1');
    setSelectType('expense');
    setSelectCategory('1');
    setDescription('');
    setAmount(0.0);
    // setAllTransactions([data[0], ...transactions]);
    // dispatch(createTransaction());
    refetchTransactions();
    refetchTotalBalance();
    onClose();
  };

  const {
    isOpen: isOpenSankey,
    onOpen: onOpenSankey,
    onClose: onCloseSankey,
  } = useDisclosure();

  const moveToPreviousMonth = () => {
    setPreviousMonth(
      selectedStartDate,
      setSelectedStartDate,
      setSelectedEndDate
    );
  };

  const moveToNextMonth = () => {
    setNextMonth(selectedStartDate, setSelectedStartDate, setSelectedEndDate);
  };

  // if (isLoading)
  //   return (
  //     <Layout>
  //       <Flex
  //         w="100%"
  //         marginTop="30vh"
  //         justifyContent="center"
  //         alignItems="center"
  //       >
  //         <Spinner
  //           size="xl"
  //           thickness="4px"
  //           speed="0.65s"
  //           emptyColor="gray.200"
  //           color="secondaryBlue"
  //         />
  //       </Flex>
  //     </Layout>
  //   );

  return (
    <Layout>
      <Flex
        gap="25px"
        direction="row"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        mt={4}
        mb="20px"
      >
        <Text fontSize="4xl" fontWeight="extrabold">
          Overview
        </Text>
        <Flex gap="1rem">
          <Flex gap="10px" w="100%">
            <IconButton
              icon={<FaChevronLeft />}
              onClick={moveToPreviousMonth}
            />
            <Input
              type="text"
              value={`${new Date(selectedStartDate).toLocaleString('default', {
                month: 'long',
              })}, ${new Date(selectedStartDate).getFullYear()}`}
              readOnly
            />
            <IconButton
              icon={<FaChevronRight />}
              onClick={moveToNextMonth}
              disabled={rightButtonDisabled}
            />
          </Flex>
          <Button
            onClick={onOpen}
            colorScheme="blue"
            variant="solid"
            alignSelf="self-end"
            w="200px"
          >
            Add Transaction
          </Button>
        </Flex>
      </Flex>
      {transactions && !isLoading ? (
        <Flex gap="30px" direction="column">
          <Flex direction="column" gap="1rem" alignItems="flex-end">
            <CategoriseModal
              uncategorisedTransactions={uncategorizedTransactions}
              expenseCategories={expenseCategories}
              incomeCategories={incomeCategories}
              refetchData={refetchTransactions}
            />
            <Alert status="error" borderRadius="10px">
              <AlertIcon />
              <AlertTitle>You have exceeded your budget for Food!</AlertTitle>
              <AlertDescription>
                Do not indulge in expensive cafes or restaurants all the time.
              </AlertDescription>
            </Alert>
          </Flex>
          <SankeyModal
            isOpen={isOpenSankey}
            onClose={onCloseSankey}
            totalIncome={totalIncome}
            totalExpense={totalExpense}
            incomeTransactions={incomeTransactionsGroupedByCategoryAndSorted}
            expenseTransactions={expenseTransactionsGroupedByCategoryAndSorted}
            previousBalance={totalBalancePrevMonth}
            remainingBalance={totalBalance}
            period={`${new Date(selectedStartDate).toLocaleString('default', {
              month: 'long',
            })} ${new Date(selectedStartDate).getFullYear()}`}
          />
          <Flex gap="25px" direction="row" wrap={true} w="100%">
            <Card
              w="25%"
              borderRadius="0 0 0.375rem 0.375rem"
              borderTop="3px solid"
              borderTopColor="purple.300"
              onClick={onOpenSankey}
              cursor="pointer"
            >
              <Stat>
                <CardBody>
                  <StatLabel>Total Balance</StatLabel>
                  <StatNumber>{`MYR ${totalBalance.toFixed(2)}`}</StatNumber>
                  <StatHelpText>{dateRange}</StatHelpText>
                </CardBody>
              </Stat>
            </Card>
            <Card
              w="25%"
              borderRadius="0 0 0.375rem 0.375rem"
              borderTop="3px solid"
              borderTopColor="blue.300"
              onClick={onOpenSankey}
              cursor="pointer"
            >
              <Stat>
                <CardBody>
                  <StatLabel>Nett Change</StatLabel>
                  <StatNumber>{`MYR ${nettChange.toFixed(2)}`}</StatNumber>
                  <StatHelpText>{dateRange}</StatHelpText>
                </CardBody>
              </Stat>
            </Card>
            <Card
              w="25%"
              borderRadius="0 0 0.375rem 0.375rem"
              borderTop="3px solid"
              borderTopColor="green"
              onClick={onOpenSankey}
              cursor="pointer"
            >
              <Stat>
                <CardBody>
                  <StatLabel>Total Income</StatLabel>
                  <StatNumber color="green">{`MYR ${totalIncome.toFixed(
                    2
                  )}`}</StatNumber>
                  <StatHelpText>{dateRange}</StatHelpText>
                </CardBody>
              </Stat>
            </Card>
            <Card
              w="25%"
              borderRadius="0 0 0.375rem 0.375rem"
              borderTop="3px solid"
              borderTopColor="red.500"
              onClick={onOpenSankey}
              cursor="pointer"
            >
              <Stat>
                <CardBody>
                  <StatLabel>Total Expense</StatLabel>
                  <StatNumber color="red.700">{`MYR ${totalExpense.toFixed(
                    2
                  )}`}</StatNumber>
                  <StatHelpText>{dateRange}</StatHelpText>
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
                    <ResponsiveContainer width="100%" height={300} aspect={2}>
                      <PieChart width="100%" height="100%">
                        <Pie
                          data={incomeTransactionsGroupedByCategoryAndSorted}
                          cx="50%"
                          cy="50%"
                          // labelLine={true}
                          label={({
                            cx,
                            cy,
                            midAngle,
                            innerRadius,
                            outerRadius,
                            value,
                            index,
                          }) => {
                            const RADIAN = Math.PI / 180;
                            // eslint-disable-next-line
                            const radius =
                              25 + innerRadius + (outerRadius - innerRadius);
                            // eslint-disable-next-line
                            const x =
                              cx + radius * Math.cos(-midAngle * RADIAN);
                            // eslint-disable-next-line
                            const y =
                              cy + radius * Math.sin(-midAngle * RADIAN);

                            return (
                              <text
                                x={x}
                                y={y}
                                fill="#8884d8"
                                textAnchor={x > cx ? 'start' : 'end'}
                                dominantBaseline="central"
                                fontSize="12"
                              >
                                {
                                  incomeTransactionsGroupedByCategoryAndSorted[
                                    index
                                  ].name
                                }
                                {''}({value})
                              </text>
                            );
                          }}
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
                                <Td isNumeric>
                                  {transaction.amount.toFixed(2)}
                                </Td>
                              </Tr>
                            )
                          )}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </TabPanel>
                  <TabPanel>
                    <ResponsiveContainer width="100%" height={300} aspect={2}>
                      <PieChart width="100%" height="100%">
                        <Pie
                          data={expenseTransactionsGroupedByCategoryAndSorted}
                          cx="50%"
                          cy="50%"
                          // labelLine={true}
                          // labelKey="name"
                          // label
                          // label={renderCustomizedLabel}
                          label={({
                            cx,
                            cy,
                            midAngle,
                            innerRadius,
                            outerRadius,
                            value,
                            index,
                          }) => {
                            const RADIAN = Math.PI / 180;
                            // eslint-disable-next-line
                            const radius =
                              20 + innerRadius + (outerRadius - innerRadius);
                            // eslint-disable-next-line
                            const x =
                              cx + radius * Math.cos(-midAngle * RADIAN);
                            // eslint-disable-next-line
                            const y =
                              cy + radius * Math.sin(-midAngle * RADIAN);

                            return (
                              <text
                                x={x}
                                y={y}
                                fill="#8884d8"
                                textAnchor={x > cx ? 'start' : 'end'}
                                dominantBaseline="central"
                                fontSize="12"
                              >
                                {
                                  expenseTransactionsGroupedByCategoryAndSorted[
                                    index
                                  ].name
                                }
                                {''}({value})
                              </text>
                            );
                          }}
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
                                <Td isNumeric>
                                  {transaction.amount.toFixed(2)}
                                </Td>
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
            <Modal onClose={onClose} isOpen={isOpen} isCentered size="lg">
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
                          {selectType === 'expense'
                            ? expenseCategories.map(category => (
                                <option value={category.id}>
                                  {category.name}
                                </option>
                              ))
                            : incomeCategories.map(category => (
                                <option value={category.id}>
                                  {category.name}
                                </option>
                              ))}
                          <option value={11}>Uncategorised</option>
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
                                      colorScheme={transaction.categories.color}
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
