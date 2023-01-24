import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatGroup,
  Progress,
  Tooltip,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Tag,
  Flex,
} from '@chakra-ui/react';
import _ from 'lodash';

const itemDetails = ({ budget }) => {
  const { name, limit, totalExpense, percentage, categories, transactions } =
    budget;
  const currentDate = new Date();
  // const completionDate = new Date();
  // completionDate.setMonth(
  //   completionDate.getMonth() +
  //     Math.round(selectedItem.total / selectedItem.per_month)
  // );

  const parseAmount = (amount, categoryType) => {
    if (categoryType === 'expense') {
      return `-${amount.toFixed(2)}`;
    } else {
      return `+${amount.toFixed(2)}`;
    }
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

  return (
    <Card w="100%" h="100%">
      <CardHeader bgColor="secondaryBlue" borderRadius="10px 10px 0px 0px">
        <Text fontSize="2xl" fontWeight="bold" color="white">
          {name}
        </Text>
        <Flex gap={2} mt={2}>
          {categories.map(category => (
            <Tag key={category.id} colorScheme={category.color}>
              {category.name}
            </Tag>
          ))}
        </Flex>
      </CardHeader>
      <CardBody>
        <StatGroup mb={5}>
          <Stat>
            <StatLabel>Total Budget</StatLabel>
            <StatNumber>
              {limit.toLocaleString('en-US', {
                style: 'currency',
                currency: 'MYR',
              })}
            </StatNumber>
          </Stat>
        </StatGroup>
        <StatGroup mb={5}>
          <Stat>
            <StatLabel color="red.600">Spent</StatLabel>
            <StatNumber color="red.600">
              {totalExpense.toLocaleString('en-US', {
                style: 'currency',
                currency: 'MYR',
              })}
            </StatNumber>
            <StatHelpText>
              As of {currentDate.getDate()}{' '}
              {currentDate.toLocaleString('default', { month: 'long' })}{' '}
              {currentDate.getFullYear()}
            </StatHelpText>
          </Stat>
          <Stat>
            <StatLabel color="green.600">Remaining expenditure</StatLabel>
            <StatNumber color="green.600">
              {(limit - totalExpense).toLocaleString('en-US', {
                style: 'currency',
                currency: 'MYR',
              })}
            </StatNumber>
          </Stat>
        </StatGroup>
        <Box mb="30px">
          <Text fontSize="md" mb="5px">
            Total expenditure
          </Text>
          <Tooltip
            hasArrow
            label={`${percentage}%`}
            bg="gray.300"
            color="black"
            placement="top"
          >
            <Progress
              hasStripe
              colorScheme="blue"
              height="32px"
              value={percentage}
            />
          </Tooltip>
        </Box>
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
                    {transactionsGroupedByDate[dateKey].map(transaction => (
                      <Tr>
                        <Td>
                          <Tag colorScheme={transaction.categories.color}>
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
                    ))}
                  </>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </CardBody>
    </Card>
  );
};

export default itemDetails;
