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
  Text,
  Tag,
  IconButton,
  Input,
  FormControl,
  Box,
  FormLabel,
  VStack,
  NumberInput,
  NumberInputField,
  Image,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import Layout from '../../components/layout';
import { PieChart, Pie, Cell, ResponsiveContainer, LabelList } from 'recharts';
import { useContainerDimensions } from '../../hooks/useContainerDimensions';
import { useTransactions } from '../../hooks/useTransactions';
import { useWallets } from '../../hooks/useWallets';
import _ from 'lodash';
import CategoriseModal from '../../components/categoriseModal';
import {
  FaChevronLeft,
  FaChevronRight,
  FaRegStar,
  FaStar,
} from 'react-icons/fa';
import { useCategories } from '../../hooks/useCategories';
import { useTotalBalance } from '../../hooks/useTotalBalance';
import {
  firstDayOfMonth,
  lastDayOfMonth,
  setNextMonth,
  setPreviousMonth,
  today,
} from '../../helpers';
import * as api from '../../api/index';
import supabase from '../../supabaseClient';
import { useCSVReader } from 'react-papaparse';
import SankeyModal from '../../components/sankeyModal';

const parseAmount = (amount, categoryType) => {
  if (categoryType === 'expense') {
    return `-${amount.toFixed(2)}`;
  } else {
    return `+${amount.toFixed(2)}`;
  }
};

const Wallet = () => {
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

  const {
    data: wallets,
    isLoading: walletsAreLoading,
    refetch: refetchWallets,
  } = useWallets();
  const {
    expenseCategories,
    incomeCategories,
    isLoading: categoriesAreLoading,
  } = useCategories();

  const defaultWalletId =
    !walletsAreLoading && wallets ? wallets[0].id : undefined;
  const [selectedWalletId, setSelectedWalletId] = useState(defaultWalletId);
  const selectedWallet =
    !walletsAreLoading && wallets
      ? wallets.find(wallet => wallet.id === selectedWalletId)
      : undefined;
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
    walletId: selectedWalletId,
    startDate: selectedStartDate,
    endDate: selectedEndDate,
  });
  const {
    data: totalBalance,
    isLoading: totalBalanceIsLoading,
    totalBalancePrevMonth,
    refetch: refetchTotalBalance,
  } = useTotalBalance(selectedStartDate, selectedEndDate, selectedWalletId);
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

  const COLORS = {
    gray: '#A0AEC0',
    red: '#E53E3E',
    orange: '#ED8936',
    yellow: '#FAF089',
    green: '#68D391',
    teal: '#4FD1C5',
    blue: '#4299E1',
    cyan: '#0BC5EA',
    purple: '#9F7AEA',
    pink: '#ED64A6',
    twitter: '#BEE3F8',
  };

  useEffect(() => {
    if (!walletsAreLoading) setSelectedWalletId(wallets[0].id);
  }, [walletsAreLoading, wallets]);

  const [isFav, setIsFav] = useState(true);
  const [timeoutId, setTimeoutId] = useState();

  useEffect(() => {
    if (selectedWallet) {
      setIsFav(selectedWallet?.isFav);
    } else {
      const wallet = wallets?.find(wallet => wallet.id === defaultWalletId);
      setIsFav(wallet?.isFav);
    }
  }, [selectedWalletId, wallets]);

  const favouriteWalletHandler = () => {
    setIsFav(!isFav);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    setTimeoutId(
      setTimeout(async () => {
        if (!isFav !== selectedWallet?.isFav) {
          await api.favouriteWallet(selectedWalletId, !isFav).then(data => {
            refetchWallets();
          });
          toast({
            title: !isFav === true ? 'Wallet favourited' : 'Wallet unfavourited',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
        }
      }, 150)
    );
  };

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
  const [name, setName] = useState('');
  const [balance, setBalance] = useState(0);

  const handleName = e => {
    setName(e.target.value);
  };

  const handleBalance = async e => {
    setBalance(e.target.value);
  };

  const toast = useToast();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const data = await api.createWallet(name, balance);
      refetchWallets();
      toast({
        title: 'Wallet created!',
        description: `Custom wallet ${name} created with an initial balance of RM ${balance}.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setName('');
      setBalance(0);
      onClose();
    } catch (e) {
      console.log(e);
      toast({
        title: 'Failed',
        description: `An error occured.`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const {
    isOpen: isOpenAddTransaction,
    onOpen: onOpenAddTransaction,
    onClose: onCloseAddTransaction,
  } = useDisclosure();

  const todayDate = new Date();
  const offset = todayDate.getTimezoneOffset();
  const [date, setDate] = useState(
    new Date(todayDate.getTime() - offset * 60 * 1000)
      .toISOString()
      .split('T')[0]
  );
  const [selectType, setSelectType] = useState('expense');
  const [selectCategory, setSelectCategory] = useState('1');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0.0);

  const handleDate = e => {
    setDate(e.target.value);
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
    setAmount(e.target.value);
  };

  const handleAddTransaction = async e => {
    e.preventDefault();
    console.log('submit');
    const { data } = await supabase
      .from('transactions')
      .insert({
        wallet_id: selectedWalletId,
        date: date,
        category_id: selectCategory,
        description: description,
        amount: amount,
      })
      .select(`*, categories (*), wallets (*)`);
    console.log(data);
    setSelectType('expense');
    setSelectCategory('1');
    setDescription('');
    setAmount(0.0);
    refetchTransactions();
    refetchTotalBalance();
    onCloseAddTransaction();
    toast({
      title: 'Transaction added!',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  const { CSVReader } = useCSVReader();

  const {
    isOpen: isOpenImport,
    onOpen: onOpenImport,
    onClose: onCloseImport,
  } = useDisclosure();

  const [importData, setImportData] = useState([]);

  const handleImport = () => {
    importData.map(async data => {
      if (!isNaN(data[2]) && !isNaN(parseFloat(data[2]))) {
        const dateSplit = data[0].split('/');
        const date = new Date(
          `${dateSplit[2]}/${dateSplit[1]}/${dateSplit[0]}`
        );

        const { res } = await supabase
          .from('transactions')
          .insert({
            wallet_id: selectedWalletId.toString(),
            date: date.toLocaleDateString(),
            description: data[1],
            category_id: data[2][0] === '-' ? '11' : '12',
            amount: data[2][0] === '-' ? data[2].substring(1) : data[2],
          })
          .select(`*, categories (*), wallets (*)`);
      } else if (!isNaN(data[3]) && !isNaN(parseFloat(data[3]))) {
        console.log(data[3]);
        const { res } = await api.updateInitialBalance(
          selectedWalletId.toString(),
          data[3]
        );
      }
    });
    setImportData([]);
    refetchTransactions();
    refetchTotalBalance();
    onCloseImport();

    toast({
      title: 'Bank statement imported!',
      description: `Transactions imported to ${selectedWallet.name}.`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  const {
    isOpen: isOpenSankey,
    onOpen: onOpenSankey,
    onClose: onCloseSankey,
  } = useDisclosure();

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
          Accounts
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
          <Button colorScheme="blue" variant="solid" onClick={onOpen} w="200px">
            Add Account
          </Button>
        </Flex>
      </Flex>
      <Modal
        onClose={onCloseAddTransaction}
        isOpen={isOpenAddTransaction}
        isCentered
        size="lg"
      >
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
                      ? expenseCategories?.map(category => (
                          <option value={category.id}>{category.name}</option>
                        ))
                      : incomeCategories?.map(category => (
                          <option value={category.id}>{category.name}</option>
                        ))}
                    <option value={11}>Uncategorised</option>
                  </Select>
                </Box>
                <Box alignItems="left" width="100%">
                  <FormLabel fontSize="sm">Description (Optional)</FormLabel>
                  <Input
                    placeholder="Write Description"
                    onChange={handleDescription}
                    value={description}
                  />
                </Box>
                <Box alignItems="left" width="100%">
                  <FormLabel fontSize="sm">Amount</FormLabel>
                  <NumberInput defaultValue={0} min={0} precision={2}>
                    <NumberInputField onChange={handleAmount} value={amount} />
                  </NumberInput>
                </Box>
              </VStack>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={handleAddTransaction}
              colorScheme="blue"
              variant="solid"
            >
              Add Transaction
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
      {!isLoading ? (
        <Flex direction="column" gap="30px">
          <CategoriseModal
            uncategorisedTransactions={uncategorizedTransactions}
            expenseCategories={expenseCategories}
            incomeCategories={incomeCategories}
            refetchData={refetchTransactions}
          />
          <Flex justifyContent="space-between" w="100%">
            <Flex gap="2rem" alignItems="center" w="40%">
              <Select value={selectedWalletId} onChange={handleWalletChange}>
                {wallets.map(wallet => (
                  <option key={wallet.id} value={wallet.id}>
                    {wallet.name}
                  </option>
                ))}
              </Select>
              <IconButton
                onClick={favouriteWalletHandler}
                icon={
                  isFav ? (
                    <FaStar color="yellow" stroke="black" strokeWidth="10px" />
                  ) : (
                    <FaRegStar fill="gray" strokeWidth="0.1px" />
                  )
                }
                w="2rem"
                h="100%"
                cursor="pointer"
                padding="0rem"
              />
            </Flex>
            {selectedWallet?.type === 'custom' && (
              <Flex gap="1rem">
                <Button onClick={onOpenImport}>Import Bank Statement</Button>
                <Button onClick={onOpenAddTransaction}>Add Transaction</Button>
              </Flex>
            )}
            <Modal
              onClose={onCloseImport}
              isOpen={isOpenImport}
              isCentered
              size="lg"
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Import Bank Statement</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <CSVReader
                    onUploadAccepted={results => {
                      setImportData([...results.data]);
                    }}
                  >
                    {({
                      getRootProps,
                      acceptedFile,
                      ProgressBar,
                      getRemoveFileProps,
                    }) => (
                      <>
                        <Flex alignItems="center" gap="1rem" mb="1rem">
                          <Button {...getRootProps()}>Browse CSV file</Button>
                          <Box>{acceptedFile && acceptedFile.name}</Box>
                          {acceptedFile && (
                            <Button
                              {...getRemoveFileProps()}
                              colorScheme="red"
                              variant="ghost"
                            >
                              Remove
                            </Button>
                          )}
                        </Flex>
                        <ProgressBar />
                      </>
                    )}
                  </CSVReader>
                </ModalBody>
                <ModalFooter>
                  <Button
                    onClick={handleImport}
                    colorScheme="blue"
                    variant="solid"
                    disabled={!importData.length}
                  >
                    Import
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Flex>

          <Flex gap="25px" direction="row" wrap={true} w="100%">
            <Card
              w="25%"
              borderRadius="0.375rem"
              borderTop="3px solid"
              borderTopColor="secondaryBlue"
              onClick={onOpenSankey}
              cursor="pointer"
            >
              <Stat>
                <CardBody>
                  <StatLabel>Total Balance</StatLabel>
                  <StatNumber color="secondaryBlue">{`MYR ${totalBalance.toFixed(
                    2
                  )}`}</StatNumber>
                  <StatHelpText>{dateRange}</StatHelpText>
                </CardBody>
              </Stat>
            </Card>
            <Card
              w="25%"
              borderRadius="0.375rem"
              borderTop="3px solid"
              borderTopColor={
                nettChange < 0
                  ? 'red.600'
                  : nettChange > 0
                  ? 'green'
                  : 'secondaryBlue'
              }
              onClick={onOpenSankey}
              cursor="pointer"
            >
              <Stat>
                <CardBody>
                  <StatLabel>Nett Change</StatLabel>
                  <StatNumber
                    color={
                      nettChange < 0
                        ? 'red.600'
                        : nettChange > 0
                        ? 'green'
                        : 'secondaryBlue'
                    }
                  >{`MYR ${nettChange.toFixed(2)}`}</StatNumber>
                  <StatHelpText>{dateRange}</StatHelpText>
                </CardBody>
              </Stat>
            </Card>
            <Card
              w="25%"
              borderRadius="0.375rem"
              borderTop="3px solid"
              borderTopColor="green"
              onClick={onOpenSankey}
              cursor="pointer"
            >
              <Stat>
                <CardBody>
                  <StatLabel>Income</StatLabel>
                  <StatNumber color="green">{`MYR ${totalIncome.toFixed(
                    2
                  )}`}</StatNumber>
                  <StatHelpText>{dateRange}</StatHelpText>
                </CardBody>
              </Stat>
            </Card>
            <Card
              w="25%"
              borderRadius="0.375rem"
              borderTop="3px solid"
              borderTopColor="red.600"
              onClick={onOpenSankey}
              cursor="pointer"
            >
              <Stat>
                <CardBody>
                  <StatLabel>Expense</StatLabel>
                  <StatNumber color="red.600">{`MYR ${totalExpense.toFixed(
                    2
                  )}`}</StatNumber>
                  <StatHelpText>{dateRange}</StatHelpText>
                </CardBody>
              </Stat>
            </Card>
          </Flex>
          <Flex gap="30px" direction="row">
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
                          innerRadius={40}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="amount"
                        >
                          {incomeTransactionsGroupedByCategoryAndSorted.map(
                            (category, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[category.color]}
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
                            (category, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[category.color]}
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
            <Flex gap="25px" direction="column" wrap={true} w="60%">
              <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Add Account</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <FormControl>
                      <VStack spacing={6}>
                        <Box alignItems="left" width="100%">
                          <FormLabel fontSize="sm">Account Name</FormLabel>
                          <Input
                            placeholder="Name"
                            onChange={handleName}
                            value={name}
                          />
                        </Box>
                        <Box alignItems="left" width="100%">
                          <FormLabel fontSize="sm">Initial balance</FormLabel>
                          <NumberInput defaultValue={0} min={0} precision={2}>
                            <NumberInputField
                              onChange={handleBalance}
                              value={balance}
                            />
                          </NumberInput>
                        </Box>
                        <Flex direction="column" gap={3} w="100%">
                          <Button
                            w="100%"
                            backgroundColor="#f1592a"
                            color="white"
                            _hover={{ background: '#f1592a !important' }}
                          >
                            <Image
                              w="1.5rem"
                              h="1.5rem"
                              src="https://static.vecteezy.com/system/resources/previews/012/223/540/non_2x/shopee-element-symbol-shopee-food-shopee-icon-free-vector.jpg"
                            />
                            &nbsp;Import from ShopeePay
                          </Button>
                          <Button
                            w="100%"
                            backgroundColor="#245dab"
                            color="white"
                            _hover={{ background: '#245dab !important' }}
                          >
                            <Image
                              w="1.25rem"
                              h="1.25rem"
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Touch_%27n_Go_eWallet_logo.svg/768px-Touch_%27n_Go_eWallet_logo.svg.png?20200518080317"
                            />
                            &nbsp;&nbsp;Import from TnG
                          </Button>
                        </Flex>
                      </VStack>
                    </FormControl>
                  </ModalBody>
                  <ModalFooter>
                    <Flex gap="1rem">
                      <Button onClick={onClose}>Close</Button>
                      <Button
                        onClick={handleSubmit}
                        colorScheme="blue"
                        variant="solid"
                      >
                        Add Account
                      </Button>
                    </Flex>
                  </ModalFooter>
                </ModalContent>
              </Modal>

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
