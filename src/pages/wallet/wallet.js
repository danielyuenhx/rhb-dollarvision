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
    refetch: refetchTotalBalance,
  } = useTotalBalance(selectedEndDate, selectedWalletId);
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

  const [isFav, setIsFav] = useState(true);
  const [timeoutId, setTimeoutId] = useState();

  useEffect(() => {
    if (selectedWallet) {
      setIsFav(selectedWallet?.isFav);
    } else {
      setIsFav(wallets?.find(wallet => wallet.id === defaultWalletId).isFav);
    }
  }, [selectedWallet, isLoading, walletsAreLoading]);

  const favouriteWalletHandler = () => {
    setIsFav(!isFav);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    setTimeoutId(
      setTimeout(() => {
        if (!isFav !== selectedWallet?.isFav) {
          api.favouriteWallet(selectedWalletId, !isFav).then(data => {
            refetchWallets();
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
        description: `Custom wallet ${name} created with an initial balance of RM${balance}.`,
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
            <Flex gap="2rem" alignItems="center">
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
                w="100%"
              >
                <Flex gap="10px" w="100%">
                  <IconButton
                    icon={<FaChevronLeft />}
                    onClick={moveToPreviousMonth}
                  />
                  <Input
                    type="text"
                    value={`${new Date(selectedStartDate).toLocaleString(
                      'default',
                      {
                        month: 'long',
                      }
                    )}, ${new Date(selectedStartDate).getFullYear()}`}
                    readOnly
                  />
                  <IconButton
                    icon={<FaChevronRight />}
                    onClick={moveToNextMonth}
                    disabled={rightButtonDisabled}
                  />
                </Flex>
                {selectedWallet && selectedWallet.type === 'custom' && (
                  <Button>Add Transaction</Button>
                )}
                <Button colorScheme="blue" variant="solid" onClick={onOpen}>
                  Add Wallet
                </Button>
              </Flex>
            </Flex>

            <Modal onClose={onClose} isOpen={isOpen} isCentered>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Add Wallet</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <FormControl>
                    <VStack spacing={6}>
                      <Box alignItems="left" width="100%">
                        <FormLabel fontSize="sm">Wallet Name</FormLabel>
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
                      Add Wallet
                    </Button>
                  </Flex>
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
                    <StatHelpText>{dateRange}</StatHelpText>
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
                    <StatHelpText>{dateRange}</StatHelpText>
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
                    <StatHelpText>{dateRange}</StatHelpText>
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
                    <StatHelpText>{dateRange}</StatHelpText>
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
