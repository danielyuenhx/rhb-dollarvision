import React from 'react';
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
} from '@chakra-ui/react';
import { useTransactions } from '../../hooks/useTransactions';
import { useCalculations } from '../../hooks/useCalculations';

const Tables = () => {
  const { allTransactionsByWallet } = useTransactions(1);
  const { totalBalance } = useCalculations(0, allTransactionsByWallet);

  return (
    <>
      <TableContainer
        minHeight="200px"
        borderRadius="5px"
        mb="25px"
        border="0.5px solid lightgray"
      >
        <Table variant="simple">
          <Thead bg="primaryBlue" borderRadius="5px">
            <Tr>
              <Th color="white" fontWeight="bold" fontSize="1rem">
                ASSETS
              </Th>
              <Th></Th>
              <Th isNumeric>
                <Button
                  variant="primaryButton"
                  width="auto"
                  fontSize="0.9rem"
                  _hover={{ bg: 'secondaryBlue' }}
                >
                  Add Account
                </Button>
              </Th>
            </Tr>
          </Thead>
          <Thead>
            <Tr bg="gray.100">
              <Th>Local Currency Deposits</Th>
              <Th></Th>
              <Th isNumeric>Balance</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr
              transitionDuration="0.2s"
              _hover={{ bg: 'gray.200', cursor: 'pointer' }}
            >
              <Td color="primaryBlue" fontWeight="bold">
                SAVINGS ACCOUNT-I
              </Td>
              <Td>MYR</Td>
              <Td isNumeric>{totalBalance.toFixed(2)}</Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td color="secondaryBlue" fontWeight="bold">
                Total
              </Td>
              <Td>MYR</Td>
              <Td isNumeric>{totalBalance.toFixed(2)}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <TableContainer
        minHeight="200px"
        borderRadius="5px"
        border="0.5px solid lightgray"
      >
        <Table variant="simple">
          <Thead bg="primaryBlue" borderRadius="5px">
            <Tr>
              <Th color="white" fontWeight="bold" fontSize="1rem">
                LIABILITIES
              </Th>
              <Th></Th>
              <Th isNumeric>
                <Button
                  variant="primaryButton"
                  width="auto"
                  fontSize="0.9rem"
                  _hover={{ bg: 'secondaryBlue' }}
                >
                  Add Account
                </Button>
              </Th>
            </Tr>
          </Thead>
          <Thead>
            <Tr bg="gray.100">
              <Th>Local Currency Deposits</Th>
              <Th></Th>
              <Th isNumeric>Balance</Th>
            </Tr>
          </Thead>
          <Tbody></Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Tables;
