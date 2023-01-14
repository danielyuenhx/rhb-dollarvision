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
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import Layout from '../../components/layout';
import CreditCard from './images/credit.png';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useContainerDimensions } from '../../hooks/useContainerDimensions';
import { useCalculations } from '../../hooks/useCalculations';
import { useTransactions } from '../../hooks/useTransactions';
import { useWallets } from '../../hooks/useWallets';

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
  const { transactions, allTransactions, isLoading } = useTransactions(
    selectedWallet.id,
    filteredCategories
  );
  const { totalBalance, totalIncome, totalExpense, nettChange } =
    useCalculations(initialBalance, transactions);

  const handleWalletChange = e => {
    setSelectedWallet(wallets.find(w => w.id === parseInt(e.target.value)));
  };

  useEffect(() => {
    if (wallets.length > 0 && !walletsIsLoading) {
      setSelectedWallet(wallets[0]);
    }
  }, [walletsIsLoading, wallets]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const tabsRef = useRef();
  const { width } = useContainerDimensions(tabsRef);

  const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Layout>
      {!walletsIsLoading && !isLoading && (
        <Flex gap="30px" direction="row">
          <Flex gap="25px" direction="column" w="35%">
            <Select value={selectedWallet.id} onChange={handleWalletChange}>
              {wallets.map(wallet => (
                <option key={wallet.id} value={wallet.id}>
                  {wallet.name}
                </option>
              ))}
            </Select>
            <Image src={CreditCard} alt="credit" />
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
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={renderCustomizedLabel}
                        innerRadius={40}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {data.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
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
                        {/* group transactions by category and create a row for each category and sort by highest number of transactions */}
                        {/* {CATEGORIES_DATA.map(category => (
                        <Tr key={category.id}>
                          <Td>{category.name}</Td>
                          <Td>{} */}
                        <Tr>
                          <Td>Food</Td>
                          <Td>6</Td>
                          <Td isNumeric>25.4</Td>
                        </Tr>
                        <Tr>
                          <Td>Transport</Td>
                          <Td>9</Td>
                          <Td isNumeric>30.48</Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </TableContainer>
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
          <Flex gap="25px" direction="column" wrap={true} w="65%">
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
                    <StatHelpText>Feb 12 - Feb 28</StatHelpText>
                  </CardBody>
                </Stat>
              </Card>
              <Card w="50%">
                <Stat>
                  <CardBody>
                    <StatLabel>Nett Change</StatLabel>
                    <StatNumber>{`MYR ${nettChange.toFixed(2)}`}</StatNumber>
                    <StatHelpText>Feb 12 - Feb 28</StatHelpText>
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
                    <StatHelpText>Feb 12 - Feb 28</StatHelpText>
                  </CardBody>
                </Stat>
              </Card>
              <Card w="50%">
                <Stat>
                  <CardBody>
                    <StatLabel>Expense</StatLabel>
                    <StatNumber>{`MYR ${totalExpense.toFixed(2)}`}</StatNumber>
                    <StatHelpText>Feb 12 - Feb 28</StatHelpText>
                  </CardBody>
                </Stat>
              </Card>
            </Flex>

            <Card mb={10}>
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Category</Th>
                      <Th>Date</Th>
                      <Th>Description</Th>
                      <Th isNumeric>Amount</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {transactions.map(transaction => (
                      <Tr key={transaction.id}>
                        <Td>{transaction.categories.name}</Td>
                        <Td>
                          {transaction.date.split('-').reverse().join('/')}
                        </Td>
                        <Td>{transaction.description}</Td>
                        <Td isNumeric>
                          {parseAmount(
                            transaction.amount,
                            transaction.categories.type
                          )}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Card>
          </Flex>
        </Flex>
      )}
    </Layout>
  );
};

export default Wallet;
