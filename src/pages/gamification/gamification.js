import { Card, CardBody, CardFooter, CardHeader } from '@chakra-ui/card';
import { SimpleGrid, Flex, Box, Text } from '@chakra-ui/layout';
import React from 'react';
import Layout from '../../components/layout';

const Gamification = () => {
  const reward = [
    {
      label: 'Budget! Budget! Budget!',
      description: 'Stay within your budget for any one of the category',
      expired: '11/10/2023',
    },
    {
      label: 'Turn around',
      description:
        'Spend atleast 10% lesser compared to your previous month spending',
      expired: '11/10/2023',
    },
    {
      label: 'On the way!',
      description: 'Save RM1000 for one of the item in your piggy bank',
      expired: '11/10/2023',
    },
    {
      label: 'Boring Guy',
      description: 'Spend less than RM 200 in entertainments',
      expired: '11/10/2023',
    },
    {
      label: 'Stop it NOW!',
      description: 'Spend more than RM3000 per month',
      expired: '11/10/2023',
    },
  ];

  return (
    <Layout>
      <SimpleGrid minChildWidth="300px" spacing="50px">
        {reward.map(reward => {
          return (
            <Card height="400px">
              <CardHeader>{reward.label}</CardHeader>
              <CardBody>
                <Flex>
                  <Text>{reward.description}</Text>
                </Flex>
              </CardBody>
              <CardFooter></CardFooter>
            </Card>
          );
        })}
      </SimpleGrid>
    </Layout>
  );
};

export default Gamification;
