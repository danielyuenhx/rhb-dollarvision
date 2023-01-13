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
} from '@chakra-ui/react';
import { SUMMARY_DATA } from '../../data';

const SpendingCategorySection = data => {
  return data.map(data => {
    let amount = 0;

    if (data.totalSpend > data.averageSpend) {
      amount = data.totalSpend - data.averageSpend;
    } else {
      amount = data.averageSpend - data.totalSpend;
    }

    return (
      <Flex direction="column" mt="25px" key={data.label}>
        <Text fontSize="2xl" fontWeight="bold">
          {data.label}
        </Text>
        <StatGroup w="100%">
          <Stat>
            <StatLabel>Your spending this month</StatLabel>
            <StatNumber>RM {data.totalSpend}</StatNumber>
            <StatHelpText>
              <Flex align="center">
                <StatArrow
                  type={
                    data.totalSpend > data.averageSpend
                      ? 'increase'
                      : 'decrease'
                  }
                  color={data.totalSpend > data.averageSpend ? 'red' : 'green'}
                />
                <Text
                  color={data.totalSpend > data.averageSpend ? 'red' : 'green'}
                >
                  RM {amount}&nbsp;
                  {data.totalSpend > data.averageSpend ? 'More' : 'Less'}
                </Text>
              </Flex>
            </StatHelpText>
          </Stat>

          <Stat>
            <StatLabel>Average young adults</StatLabel>
            <StatNumber>RM {data.averageSpend}</StatNumber>
          </Stat>

          <Stat>
            <StatLabel>Your last month spending</StatLabel>
            <StatNumber>RM {data.lastMonth}</StatNumber>
          </Stat>
        </StatGroup>

        {data.advice && (
          <UnorderedList spacing="10px" mt="20px">
            {data.advice?.map(advice => {
              return <ListItem key={advice.key}>{advice.info}</ListItem>;
            })}
          </UnorderedList>
        )}
      </Flex>
    );
  });
};

const UserSummary = () => {
  return (
    <Flex>
      <Card w="100%">
        <CardHeader fontSize="2xl" fontWeight="bold">
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

            {SpendingCategorySection(SUMMARY_DATA)}
          </Flex>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default UserSummary;
