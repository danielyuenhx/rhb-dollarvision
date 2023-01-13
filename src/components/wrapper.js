import { Box, Flex, Text } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Sidebar } from './sidebar';
import { useLocation } from 'react-router-dom';

const Wrapper = () => {
  const [title, setTitle] = useState('Dashboard');
  const location = useLocation();
  const { pathname: pathName } = location;

  useEffect(() => {
    switch (pathName) {
      case '/':
        setTitle('Overview');
        break;
      case '/piggybank':
        setTitle('Piggy Bank');
        break;
      case '/wallet':
        setTitle('Wallet');
        break;
      case '/budget':
        setTitle('Budget');
        break;
      case '/gamification':
        setTitle('Gamification');
        break;
      case '/profile':
        setTitle('Profile');
        break;

      default:
        setTitle('Overview');
        break;
    }
  }, [pathName]);

  return (
    <Flex
      bgColor="backgroundColor"
      h="auto"
      minHeight="100vh"
      dir="row"
      w="100%"
      margin="auto"
    >
      <Sidebar />
      <Box paddingLeft="5%" paddingTop="50px">
        <Text fontSize="4xl" >
          {title}
        </Text>

        <Outlet />
      </Box>
    </Flex>
  );
};

export default Wrapper;
