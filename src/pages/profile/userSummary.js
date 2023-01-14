import React from 'react';
import { Flex, Card, CardBody, CardHeader, Text } from '@chakra-ui/react';
import UserStatistics from './userStatistics';

const UserSummary = () => {
  return (
    <Flex>
      <Card w="100%">
        <CardHeader fontSize="2xl" fontWeight="bold">
          <Text>Statistics</Text>
          <Text fontWeight="300" fontSize="sm">
            Comparison of your spending patterns with other users in your area
          </Text>
        </CardHeader>
        <CardBody>
          <Flex direction="column">
            <Flex w="70%">
              <Text>
                Overall, you are not very consistent at budgeting and saving
                money especially when it comes to Food and Shopping. You spend
                much more on average compared to other young adults in your
                area.
              </Text>
            </Flex>

            <UserStatistics />
          </Flex>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default UserSummary;
