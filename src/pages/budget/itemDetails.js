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
  Badge,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const itemDetails = ({
  selectedItem,
  spent,
  categories,
  dateKeysSorted,
  transactionsGroupedByDate,
  parseAmount,
}) => {
  const currentDate = new Date();
  // const completionDate = new Date();
  // completionDate.setMonth(
  //   completionDate.getMonth() +
  //     Math.round(selectedItem.total / selectedItem.per_month)
  // );

  const progress = spent / selectedItem.total;

  return (
    <Card w="100%" h="100%">
      <CardHeader bgColor="secondaryBlue" borderRadius="10px 10px 0px 0px">
        <Text fontSize="2xl" fontWeight="bold" color="white">
          {selectedItem.name}
        </Text>
        {categories.map(category => (
          <Badge
            variant="solid"
            colorScheme="cyan"
            marginTop="5px"
            marginRight="0.6rem"
          >
            {category.name}
          </Badge>
        ))}
      </CardHeader>
      <CardBody>
        <StatGroup mb={5}>
          <Stat>
            <StatLabel>Total Budget</StatLabel>
            <StatNumber>
              {selectedItem.total.toLocaleString('en-US', {
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
              {spent.toLocaleString('en-US', {
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
              {(selectedItem.total - spent).toLocaleString('en-US', {
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
            label={`${progress * 100}%`}
            bg="gray.300"
            color="black"
            placement="top"
          >
            <Progress
              hasStripe
              colorScheme="blue"
              height="32px"
              value={progress * 100}
            />
          </Tooltip>
        </Box>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr bg="gray.200">
                <Th>Category</Th>
                <Th>Description</Th>
                <Th isNumeric>Amount</Th>
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
                        <Td>{transaction.categories.name}</Td>
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
