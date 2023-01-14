import React from 'react';
import { Flex, Card, CardBody, CardHeader, Text } from '@chakra-ui/react';
import UserStatistics from './userStatistics';

const UserSummary = () => {
  return (
    <Flex>
      <Card w="100%">
        <CardHeader
          fontSize="2xl"
          fontWeight="bold"
          bgColor="primaryBlue"
          borderTopLeftRadius="inherit"
          borderTopRightRadius="inherit"
        >
          <Flex justify="space-between">Statistics</Flex>
        </CardHeader>
        <CardBody>
          <Flex direction="column">
            <Text fontWeight="bold">
              Comparison of your spending with a young aduilt in Subang area:{' '}
            </Text>

            <Flex w="70%">
              <Text>
                Overall, you are not very good at budgeting and saving money
                especially when it comes to food and shopping. You spend a lot
                more compared to an average young adult in Subang Area.
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
