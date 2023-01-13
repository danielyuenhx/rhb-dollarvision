import React from 'react';
import {
  Flex,
  Card,
  CardBody,
  CardHeader,
  SimpleGrid,
  Box,
  Input,
  Text,
} from '@chakra-ui/react';

const UserDetails = () => {
  const details = [
    { title: 'Name', value: 'Zheng Jie' },
    { title: 'Age', value: '23' },
    { title: 'Email', value: 'ganzj45@gmail.com' },
    { title: 'Phone', value: '017-5015966' },
  ];

  return (
    <Flex bg="light blue">
      <Card w="100%">
        <CardHeader fontSize="2xl" fontWeight="bold">
          User Details
        </CardHeader>
        <CardBody>
          <SimpleGrid columns={[1, 1, 1, 2, 2]} spacing="40px">
            {details.map(detail => {
              return (
                <Box key={detail.title}>
                  <Text fontWeight="bold">{detail.title}</Text>
                  <Box mt="5px">
                    <Input defaultValue={detail.value} size="md" />
                  </Box>
                </Box>
              );
            })}
          </SimpleGrid>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default UserDetails;
