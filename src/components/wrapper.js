import { Box, Flex, Text, useMediaQuery, useColorMode } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Sidebar } from './sidebar';
import { useLocation } from 'react-router-dom';
import Header from './header';
import Footer from './footer';

const Wrapper = () => {
  const [title, setTitle] = useState('Dashboard');
  const location = useLocation();
  const { pathname: pathName } = location;
  const { colorMode } = useColorMode();

  const [desktopScreen] = useMediaQuery('(min-width: 1280px)');

  useEffect(() => {
    switch (pathName) {
      case '/':
        setTitle('');
        break;
      case '/overview':
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
      case '/rewards':
        setTitle('Rewards');
        break;
      case '/summary':
        setTitle('Summary');
        break;

      default:
        setTitle('Overview');
        break;
    }
  }, [pathName]);

  return (
    <>
      <Flex
        bgColor={colorMode === 'light' ? 'gray.50' : 'gray.800'}
        h="100%"
        minHeight="110vh"
        dir="row"
        w="auto"
        margin="auto"
      >
        {desktopScreen ? <Sidebar /> : <Footer />}
        <Flex direction="column" width="100%">
          <Header />
          <Box paddingLeft="0%" paddingTop="50px" width="80%" marginX="auto">
            <Box maxWidth="1200px" marginX="auto">
              <Text fontSize="4xl" mb="20px" fontWeight="extrabold">
                {title}
              </Text>
            </Box>

            <Outlet />
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default Wrapper;
