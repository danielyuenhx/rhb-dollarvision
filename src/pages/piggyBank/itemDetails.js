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
  Progress,
  Tooltip,
  Box,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import ProgressBar from '@ramonak/react-progress-bar';
import React from 'react';

const itemDetails = ({ selectedItem }) => {
  const currentDate = new Date();
  const completionDate = new Date();
  completionDate.setMonth(
    completionDate.getMonth() +
      Math.round(selectedItem.total / selectedItem.per_month)
  );

  const progress = selectedItem.paid / selectedItem.total;

  return (
    <Card w="100%" h="100%">
      <CardHeader bgColor="secondaryBlue" borderRadius="10px 10px 0px 0px">
        <Flex justifyContent="space-between" alignItems="center">
          <Box>
            <Text fontSize="2xl" fontWeight="bold" color="white">
              {selectedItem.name}
            </Text>
            <Text color="white">{selectedItem.desc}</Text>
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
            <StatLabel>Saved amount</StatLabel>
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
              {selectedItem.per_month.toLocaleString('en-US', {
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
              completed={progress * 100}
              height="30px"
              bgColor="#0067b1"
              labelAlignment="center"
              isLabelVisible={(progress * 100) ? true : false }
            />
          </Tooltip>
        </Box>
      </CardBody>
    </Card>
  );
};

export default itemDetails;
