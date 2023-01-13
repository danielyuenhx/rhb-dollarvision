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

const data = [
  {
    label: 'Food',
    totalSpend: '1200',
    averageSpend: '700',
    lastMonth: '1300',
    advice: [
      'Your spending on food are way too excessive!',
      'You should cook more at home.',
      'Stop going to cafe or pricey restaurants too often.',
    ],
  },
  {
    label: 'Transport',
    totalSpend: '400',
    averageSpend: '300',
    lastMonth: '300',
    advice: [
      'You are not to far off from the average spenders in transportation.',
      'Take the public transport whenever you can to reduce fuel usage.',
      'Try to have carpooling more often with your friends if possible.',
    ],
  },
  {
    label: 'Shopping',
    totalSpend: '600',
    averageSpend: '200',
    lastMonth: '300',
    advice: [
      'You do like to purchase a lot of the latest eletronic gadgets.',
      'Do not buy an item just for show off, save and invest!',
      'You do not always need the most trendy item.',
    ],
  },
  {
    label: 'Entertainment',
    totalSpend: '500',
    averageSpend: '600',
    lastMonth: '700',
    advice: [
      'Great job for staying within your budget!',
      'We noticed you spend a lot of money on cinema movies.',
      'Try to look for promotion price whenever you can to save more money.',
    ],
  },
];

const SpendingCategorySection = data => {
  return data.map(data => {
    let x = 0;
    let percentage = 0;

    if (data.totalSpend > data.averageSpend) {
      percentage = data.totalSpend / 10;
    } else {
      percentage = data.averageSpend / 10;
    }

    return (
      <Flex direction="column" mt="25px">
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
                  {percentage}%&nbsp;
                  {data.totalSpend > data.averageSpend ? 'Higher' : 'Lower'}
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
              return <ListItem key={advice}>{advice}</ListItem>;
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
                more compared to an average young adult in Subang Area. Even
                though you have a higher income compared to average fresh
                graduates, you should not spend recklessly.
              </Text>
            </Flex>

            {SpendingCategorySection(data)}
          </Flex>

          {/* <Flex gap="40px" justify="flex-start" flexWrap="wrap" mt="25px">
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
          </Flex> */}
        </CardBody>
      </Card>
    </Flex>
  );
};

export default UserSummary;
