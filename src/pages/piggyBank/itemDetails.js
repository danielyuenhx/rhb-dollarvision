import {
  Card,
  CardBody,
  CardHeader,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  VStack,
  HStack,
  Flex,
  Progress,
  Tooltip,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
} from '@chakra-ui/react';
import React from 'react';

const itemDetails = ({ selectedItem }) => {
  const currentDate = new Date();
  const completionDate = new Date();
  completionDate.setMonth(
    completionDate.getMonth() +
      Math.round(selectedItem.total / selectedItem.perMonth)
  );

  const progress = selectedItem.paid / selectedItem.total;

  return (
    <Card w="100%">
      <CardHeader>
        <Text fontSize="2xl" fontWeight="bold">
          {selectedItem.title}
        </Text>
      </CardHeader>
      <CardBody>
        <StatGroup>
          <Stat>
            <StatLabel>Total</StatLabel>
            <StatNumber>
              {selectedItem.total.toLocaleString('en-US', {
                style: 'currency',
                currency: 'MYR',
              })}
            </StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Remaining amount</StatLabel>
            <StatNumber>
              {(selectedItem.total - selectedItem.paid).toLocaleString(
                'en-US',
                {
                  style: 'currency',
                  currency: 'MYR',
                }
              )}
            </StatNumber>
          </Stat>
        </StatGroup>
        <StatGroup mb={5}>
          <Stat>
            <StatLabel>Paid amount</StatLabel>
            <StatNumber>
              {selectedItem.paid.toLocaleString('en-US', {
                style: 'currency',
                currency: 'MYR',
              })}
            </StatNumber>
            <StatHelpText>
              As of {currentDate.toLocaleString('default', { month: 'long' })}{' '}
              {currentDate.getFullYear()}
            </StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Per month</StatLabel>
            <StatNumber>
              {selectedItem.perMonth.toLocaleString('en-US', {
                style: 'currency',
                currency: 'MYR',
              })}
            </StatNumber>
            <StatHelpText>
              Expected completion by{' '}
              {completionDate.toLocaleString('default', { month: 'long' })}{' '}
              {completionDate.getFullYear()}
            </StatHelpText>
          </Stat>
        </StatGroup>
        <Box mb={10}>
          <Text fontSize="md" mb="5px">
            Progress
          </Text>
          <Tooltip
            hasArrow
            label={`${progress * 100}%`}
            bg="gray.300"
            color="black"
            placement="top"
          >
            <Progress colorScheme="blue" height="32px" value={progress * 100} />
          </Tooltip>
        </Box>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>24/4/2022</Th>
              </Tr>
            </Thead>
            <Thead>
              <Tr>
                <Th>Category</Th>
                <Th>Wallet</Th>
                <Th>Description</Th>
                <Th isNumeric>Amount</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Food</Td>
                <Td>RHB</Td>
                <Td>Lunch</Td>
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
      </CardBody>
    </Card>
  );
};

export default itemDetails;