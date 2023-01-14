import React, { Fragment } from 'react';
import {
  Flex,
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

const UserStatistics = () => {
  return (
    <Fragment>
      {SUMMARY_DATA.map(data => {
        let amount = 0;

        if (data.totalSpend > data.averageSpend) {
          amount = data.totalSpend - data.averageSpend;
        } else if (data.averageSpend > data.totalSpend) {
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
                <StatNumber
                  color={data.totalSpend > data.averageSpend ? 'red' : 'green'}
                >
                  RM {data.totalSpend}
                </StatNumber>
                <StatHelpText>
                  <Flex align="center">
                    <StatArrow
                      type={
                        data.totalSpend > data.averageSpend
                          ? 'increase'
                          : 'decrease'
                      }
                      color={
                        data.totalSpend > data.averageSpend ? 'red' : 'green'
                      }
                    />
                    <Text
                      color={
                        data.totalSpend > data.averageSpend ? 'red' : 'green'
                      }
                    >
                      RM {amount}&nbsp;
                      {data.totalSpend > data.averageSpend ? 'increase' : 'decrease'}
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
      })}
    </Fragment>
  );
};

export default UserStatistics;
