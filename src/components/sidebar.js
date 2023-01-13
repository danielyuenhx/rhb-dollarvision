import {
  Box,
  IconButton,
  Text,
  Flex,
  Avatar,
  useColorMode,
  Button,
  Collapse,
} from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWallet,
  faPiggyBank,
  faMoneyBill,
  faAward,
  faChartSimple,
  faArrowRightArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState();
  const [expand, setExpand] = useState(true);

  useEffect(() => {
    setSelected(location.pathname);
  }, [location]);

  const sideBarList = [
    {
      path: '/',
      name: 'Overview',
      icon: (
        <FontAwesomeIcon
          icon={faChartSimple}
          color={selected === '/' ? 'white' : '#3dbbf5'}
          size="2x"
        />
      ),
    },
    {
      path: '/piggybank',
      name: 'Piggy Bank',
      icon: (
        <FontAwesomeIcon
          icon={faPiggyBank}
          color={selected === '/piggybank' ? 'white' : '#3dbbf5'}
          size="2x"
        />
      ),
    },
    {
      path: '/wallet',
      name: 'Wallet',
      icon: (
        <FontAwesomeIcon
          icon={faWallet}
          color={selected === '/wallet' ? 'white' : '#3dbbf5'}
          size="2x"
        />
      ),
    },
    {
      path: '/budget',
      name: 'Budget',
      icon: (
        <FontAwesomeIcon
          icon={faMoneyBill}
          color={selected === '/budget' ? 'white' : '#3dbbf5'}
          size="2x"
        />
      ),
    },
    {
      path: '/rewards',
      name: 'Rewards',
      icon: (
        <FontAwesomeIcon
          icon={faAward}
          color={selected === '/rewards' ? 'white' : '#3dbbf5'}
          size="2x"
        />
      ),
    },
  ];

  return (
    <Box
      width={expand ? '250px' : '95px'}
      position="sticky"
      top="0"
      h="100vh"
      transitionDuration="0.1s"
      justifyContent="center"
    >
      <Box
        bg="primaryBlue"
        justifyContent={expand ? 'flex-end' : ' center'}
        display="flex"
        alignItems="center"
        paddingTop="10px"
        paddingBottom="10px"
        paddingRight={expand ? '10px' : '0px'}
      >
        <IconButton bgColor="transparent" border="0px" _hover={{}} _active={{}}>
          <FontAwesomeIcon
            icon={faArrowRightArrowLeft}
            size="2x"
            color="black"
            onClick={() => {
              setExpand(!expand);
            }}
          />
        </IconButton>
      </Box>

      <Box bgColor="secondaryBlue" px="1.5%" h="100%">
        <Flex
          justify="flex-start"
          direction="column"
          h="100%"
          alignItems="center"
        >
          <Box textAlign="center" justifyContent="center">
            {/* <Text as="b" fontSize="3xl" fontWeight="bold">
            Dollar-Vision
          </Text> */}

            {sideBarList.map(Link => {
              return (
                <Box
                  key={Link.name}
                  onClick={() => navigate(Link.path)}
                  cursor="pointer"
                  height="60px"
                  mt="30px"
                  borderRadius="10px"
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="center"
                  transitionDuration="0.2s"
                  // pl="10%"
                  gap="10%"
                  // _hover={{
                  //   backgroundColor: colorMode === 'light' ? 'white' : 'gray.800',
                  //   transform: `scale(1.1)`,
                  // }}
                >
                  <Flex
                    justify="flex-start"
                    align="center"
                    width={expand ? '150px' : '10%'}
                  >
                    <IconButton
                      bgColor="transparent"
                      border="0px"
                      _hover={{}}
                      _active={{}}
                    >
                      {Link.icon}
                    </IconButton>
                    {expand && (
                      <Text as="b" transitionDuration="0.5s" pl="15%">
                        {Link.name}
                      </Text>
                    )}
                  </Flex>
                </Box>
              );
            })}
          </Box>
          {/* <Flex
          cursor="pointer"
          borderRadius="10px"
          gap="10%"
          justifyContent="flex-start"
          pl="10%"
          marginBottom="10%"
          height="60px"
          alignItems="center"
          transitionDuration="0.2s"
          // _hover={{
          //   backgroundColor: colorMode === 'light' ? 'white' : 'gray.800',
          //   transform: `scale(1.1)`,
          // }}
        >
          <Flex
            onClick={() => navigate('/profile')}
            justify="space-between"
            alignItems="center"
            w="55%"
          >
            <Avatar size="sm" />
            <Text as="b">Profile</Text>
          </Flex>

          <ColorModeSwitcher />
        </Flex> */}
        </Flex>
      </Box>
    </Box>
  );
};
