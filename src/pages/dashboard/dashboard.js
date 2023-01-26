import React from 'react';
import { Box, Text, Alert, AlertIcon, Flex, Button } from '@chakra-ui/react';
import Tables from './tables';
import Layout from '../../components/layout';
import Icons from './icons';

const Dashboard = () => {
  return (
    <Layout>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        marginTop="-20px"
      >
        <Box>
          <Text fontSize="4xl" fontWeight="bold">
            Hi, Daniel!
          </Text>
          <Text mb="20px" color="gray.500">
            Your last login was on 10:30:00 PM, Fri 13 Jan 2023
          </Text>
        </Box>
        <Flex gap="10px">
          <Button
            variant="primaryButton"
            width="auto"
            fontSize="0.9rem"
            _hover={{ bg: 'secondaryBlue' }}
          >
            RHB Now Transaction Record
          </Button>
          <Box position="relative">
            <Box
              w="12px"
              h="12px"
              bg="red.500"
              borderRadius="100%"
              position="absolute"
              zIndex="1"
              top="-1"
              right="-1"
            />
            <Button
              variant="primaryButton"
              width="auto"
              fontSize="0.9rem"
              _hover={{ bg: 'secondaryBlue' }}
            >
              Messages
            </Button>
          </Box>
        </Flex>
      </Flex>
      <Alert status="info" mb="30px" borderRadius={5}>
        <AlertIcon />
        Kindly be informed that Kiosk terminals at RHB Branches will be
        decommissioned on 1st January 2022. We apologise for any inconvenience
        caused.
      </Alert>
      <Flex gap="50px">
        <Flex direction="column" flexGrow={2} flexBasis={2}>
          <Tables />
        </Flex>
        <Flex flexGrow={1} flexBasis={1}>
          <Icons />
        </Flex>
      </Flex>
    </Layout>
  );
};

export default Dashboard;
