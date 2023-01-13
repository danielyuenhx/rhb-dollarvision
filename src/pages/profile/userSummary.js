import React from 'react';
import {
  Flex,
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
  ListItem,
  UnorderedList,
  Divider,
} from '@chakra-ui/react';

const UserSummary = () => {
  return (
    <Flex>
      <Card w="100%">
        <CardHeader fontSize="2xl" fontWeight="bold">
          <Flex justify="space-between">User Summary</Flex>
        </CardHeader>
        <CardBody>
          <Flex gap="40px" justify="flex-start" flexWrap="wrap">
            <StatGroup w="100%">
              <Stat>
                <StatLabel>Total Spent</StatLabel>
                <StatNumber>RM3700</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" color="red" />
                  23.36% Compared to last month
                </StatHelpText>
              </Stat>

              <Stat>
                <StatLabel>Total Saved</StatLabel>
                <StatNumber>RM700</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  9.05% Compared to last month
                </StatHelpText>
              </Stat>

              <Stat>
                <StatLabel>Top Category</StatLabel>
                <StatNumber>RM700</StatNumber>
                <StatHelpText>Food</StatHelpText>
              </Stat>
            </StatGroup>
          </Flex>

          <Flex flexDirection="column" mt="25px">
            <Text fontWeight="bold">Advices based on your spending</Text>
            <Divider marginY="5px" />
            <UnorderedList spacing="10px">
              <ListItem>Lorem ipsum dolor sit amet</ListItem>
              <ListItem>Consectetur adipiscing elit</ListItem>
              <ListItem>Integer molestie lorem at massa</ListItem>
              <ListItem>Facilisis in pretium nisl aliquet</ListItem>
            </UnorderedList>
          </Flex>

         
        </CardBody>
      </Card>
    </Flex>
  );
};

export default UserSummary;
