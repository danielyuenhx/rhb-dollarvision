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
  Flex,
  Tooltip,
  Box,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import ProgressBar from '@ramonak/react-progress-bar';
import React from 'react';

const itemDetails = ({ piggyBank }) => {
  const currentDate = new Date();
  const completionDate = new Date();
  completionDate.setMonth(
    completionDate.getMonth() +
      Math.round(piggyBank.total / piggyBank.per_month)
  );

  const progress = piggyBank.paid / piggyBank.total;

  return (
    <Card w="100%" h="100%">
      <CardHeader bgColor="secondaryBlue" borderRadius="10px 10px 0px 0px">
        <Flex justifyContent="space-between" alignItems="center">
          <Box>
            <Text fontSize="2xl" fontWeight="bold" color="white">
              {piggyBank.name}
            </Text>
            <Text color="white">{piggyBank.description}</Text>
          </Box>
          <Box marginRight="10px" cursor="pointer">
            <FontAwesomeIcon icon={faEdit} size="xl" color="white" />
          </Box>
        </Flex>
      </CardHeader>
      <CardBody>
        <StatGroup mb={5}>
          <Stat>
            <StatLabel>Total</StatLabel>
            <StatNumber>
              {piggyBank.total.toLocaleString('en-US', {
                style: 'currency',
                currency: 'MYR',
              })}
            </StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Remaining amount</StatLabel>
            <StatNumber>
              {(piggyBank.total - piggyBank.paid).toLocaleString('en-US', {
                style: 'currency',
                currency: 'MYR',
              })}
            </StatNumber>
          </Stat>
        </StatGroup>
        <StatGroup mb={5}>
          <Stat>
            <StatLabel>Saved amount</StatLabel>
            <StatNumber>
              {piggyBank.paid.toLocaleString('en-US', {
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
              {piggyBank.per_month.toLocaleString('en-US', {
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
        <Box>
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
            <ProgressBar
              completed={+(progress * 100).toFixed(2)}
              height="30px"
              bgColor="#0067b1"
              labelAlignment="center"
              isLabelVisible={(progress * 100).toFixed(2) > 20 ? true : false}
            />
          </Tooltip>
        </Box>
      </CardBody>
    </Card>
  );
};

export default itemDetails;
