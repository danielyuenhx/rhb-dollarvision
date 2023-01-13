import React from 'react';
import {
  Text,
  Alert,
  AlertIcon,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
} from '@chakra-ui/react';
import Layout from '../../components/layout';

const dashboard = () => {
  return (
    <Layout>
      <Text fontSize="4xl" fontWeight="bold">
        Hi, Daniel!
      </Text>
      <Text mb="20px">Your last login was on 10:30:00 PM, Fri 13 Jan 2023</Text>
      <Alert status="info" mb="30px">
        <AlertIcon />
        Kindly be informed that Kiosk terminals at RHB Branches will be
        decommissioned on 1st January 2022. We apologise for any inconvenience
        caused.
      </Alert>
      <TableContainer
        w="65%"
        minHeight="200px"
        borderRadius="10px"
        border="1px solid lightGray"
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Local Currency Deposits</Th>
              <Th></Th>
              <Th isNumeric>Balance</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr
              transitionDuration="0.2s"
              _hover={{ bg: '#f0eded', cursor: 'pointer' }}
            >
              <Td color="primaryBlue" fontWeight="bold">
                SAVINGS ACCOUNT-I
              </Td>
              <Td>MYR</Td>
              <Td isNumeric>1526.52</Td>
            </Tr>
            <Tr
              transitionDuration="0.2s"
              _hover={{ bg: '#f0eded', cursor: 'pointer' }}
            >
              <Td color="primaryBlue" fontWeight="bold">
                STATEMENT SAVINGS ACCOUNT
              </Td>
              <Td>MYR</Td>
              <Td isNumeric>30.48</Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td color="secondaryBlue" fontWeight="bold">
                Total
              </Td>
              <Td>MYR</Td>
              <Td isNumeric>1557.00</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <TableContainer
        w="65%"
        minHeight="200px"
        borderRadius="10px"
        border="1px solid lightGray"
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Local Currency Deposits</Th>
              <Th></Th>
              <Th isNumeric>Balance</Th>
            </Tr>
          </Thead>
          <Tbody border="1px solid"></Tbody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default dashboard;
