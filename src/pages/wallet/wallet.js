import {
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Tab,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useRef } from 'react';
import Layout from '../../components/layout';
import CreditCard from './images/credit.png';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { useContainerDimensions } from '../../hooks/useContainerDimensions';

const Wallet = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const tabsRef = useRef();
  const { width, height } = useContainerDimensions(tabsRef);

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
      <Flex gap="30px" direction="row">
        <Flex gap="25px" direction="column" w="35%">
          <Select placeholder="Select wallet">
            <option value="wallet1">RHB Debit Card</option>
            <option value="wallet2">RHB Platinum Credit Card</option>
            <option value="wallet3">Wallet 3</option>
          </Select>
          <Image src={CreditCard} alt="credit" />
          <Tabs isFitted variant="enclosed" ref={tabsRef}>
            <TabList mb="1em">
              <Tab>One</Tab>
              <Tab>Two</Tab>
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
              <CardBody>
                <Heading size="s">Total Balance</Heading>
                <Text fontSize="sm" pt="2">
                  100.00
                </Text>
              </CardBody>
            </Card>
            <Card w="50%">
              <CardBody>
                <Heading size="s">Total Balance</Heading>
                <Text fontSize="sm" pt="2">
                  100.00
                </Text>
              </CardBody>
            </Card>
          </Flex>

          <Flex gap="25px" direction="row" wrap={true} w="100%">
            <Card w="50%">
              <CardBody>
                <Heading size="s">Total Balance</Heading>
                <Text fontSize="sm" pt="2">
                  100.00
                </Text>
              </CardBody>
            </Card>
            <Card w="50%">
              <CardBody>
                <Heading size="s">Total Balance</Heading>
                <Text fontSize="sm" pt="2">
                  100.00
                </Text>
              </CardBody>
            </Card>
          </Flex>

          <Card>
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
                  <Tr>
                    <Td>Food</Td>
                    <Td>RHB</Td>
                    <Td>Lunch - CR</Td>
                    <Td isNumeric>25.4</Td>
                  </Tr>
                  <Tr>
                    <Td>Transport</Td>
                    <Td>RHB</Td>
                    <Td>To work</Td>
                    <Td isNumeric>30.48</Td>
                  </Tr>
                  <Tr>
                    <Td>Dating</Td>
                    <Td>RHB</Td>
                    <Td>Cafe</Td>
                    <Td isNumeric>0.91444</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Card>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default Wallet;
