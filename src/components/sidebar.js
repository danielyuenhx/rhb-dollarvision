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
  faHome,
  faHandHoldingDollar,
  faChartPie,
  faHeart,
  faClipboard,
} from '@fortawesome/free-solid-svg-icons';
import Hamburger from 'hamburger-react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState();
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    setSelected(location.pathname);
  }, [location]);

  const originalSidebarList = [
    {
      name: 'Home',
      path: '/',
      icon: (
        <FontAwesomeIcon
          icon={faHome}
          color={selected === '/' ? 'white' : '#3dbbf5'}
          size="xl"
        />
      ),
    },
    {
      name: 'Savings',
      path: '/',
      icon: (
        <FontAwesomeIcon icon={faHandHoldingDollar} color="#3dbbf5" size="xl" />
      ),
    },
    {
      name: 'Statistics',
      path: '/',
      icon: <FontAwesomeIcon icon={faChartPie} color="#3dbbf5" size="xl" />,
    },
    {
      name: 'Favourites',
      path: '/',
      icon: <FontAwesomeIcon icon={faHeart} color="#3dbbf5" size="xl" />,
    },
  ];

  const sideBarList = [
    {
      path: '/overview',
      name: 'Overview',
      icon: (
        <FontAwesomeIcon
          icon={faChartSimple}
          color={selected === '/overview' ? 'white' : '#3dbbf5'}
          size="xl"
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
          size="xl"
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
          size="xl"
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
          size="xl"
        />
      ),
    },
    // {
    //   path: '/rewards',
    //   name: 'Rewards',
    //   icon: (
    //     <FontAwesomeIcon
    //       icon={faAward}
    //       color={selected === '/rewards' ? 'white' : '#3dbbf5'}
    //       size="xl"
    //     />
    //   ),
    // },
    {
      path: '/summary',
      name: 'Summary',
      icon: (
        <FontAwesomeIcon
          icon={faClipboard}
          color={selected === '/summary' ? 'white' : '#3dbbf5'}
          size="2x"
        />
      ),
    },
  ];

  return (
    <Box
      width={expand ? '300px' : '95px'}
      position="sticky"
      top="0"
      h="100vh"
      transitionDuration="0.5s"
      transitionTimingFunction="cubic-bezier"
      justifyContent="center"
      paddingBottom="50px"
    >
      <Box
        bg="primaryBlue"
        justifyContent={expand ? 'flex-end' : ' center'}
        display="flex"
        alignItems="center"
        paddingTop="10px"
        paddingBottom="10px"
        paddingRight={expand ? '10px' : '0px'}
        height="74px"
      >
        <IconButton bgColor="transparent" border="0px" _hover={{}} _active={{}}>
          <Hamburger
            toggle={setExpand}
            toggled={expand}
            rounded
            color="#0067b1"
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

            {originalSidebarList.map(Link => {
              return (
                <Box
                  key={Link.name}
                  onClick={() => navigate(Link.path)}
                  cursor="pointer"
                  height="70px"
                  p="5px"
                  borderRadius="10px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  transitionDuration="0.2s"
                >
                  <Flex
                    justify="flex-start"
                    align="center"
                    width={expand ? '150px' : ''}
                  >
                    <IconButton
                      bgColor="transparent"
                      border="0px"
                      _hover={{}}
                      _active={{}}
                    >
                      {Link.icon}
                    </IconButton>
                    <Text
                      as="b"
                      pl="15%"
                      color="white"
                      width={expand ? '150px' : '0px'}
                      overflow="hidden"
                      textOverflow="clip"
                      whiteSpace="nowrap"
                      transitionDuration="0.5s"
                      textAlign="left"
                    >
                      {Link.name}
                    </Text>
                  </Flex>
                </Box>
              );
            })}

            <Box
              bgColor="#0c7ac9"
              borderRadius="10px"
              width={expand ? '200px' : '50px'}
              transitionDuration="0.5s"
            >
              <Text
                textAlign="left"
                p={`${expand ? "15px" : "0px"} 0px 0px ${expand ? "15px" : "0px"}`}
                color="#ffffff"
                width={expand ? '200px' : '0px'}
                height={expand ? '35px' : '0px'}
                overflow="hidden"
                textOverflow="clip"
                whiteSpace="nowrap"
                transitionDuration="0.5s"
              >
                DollarVision
              </Text>
              {sideBarList.map(Link => {
                return (
                  <Box
                    key={Link.name}
                    onClick={() => navigate(Link.path)}
                    cursor="pointer"
                    height="70px"
                    borderRadius="10px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    transitionDuration="0.2s"
                    // pl="10%"
                    gap="10%"
                  >
                    <Flex
                      justify="flex-start"
                      align="center"
                      width={expand ? '150px' : ''}
                    >
                      <IconButton
                        bgColor="transparent"
                        border="0px"
                        _hover={{}}
                        _active={{}}
                      >
                        {Link.icon}
                      </IconButton>
                      <Text
                        as="b"
                        pl="15%"
                        color="white"
                        textAlign="left"
                        width={expand ? '150px' : '0px'}
                        overflow="hidden"
                        textOverflow="clip"
                        whiteSpace="nowrap"
                        transitionDuration="0.5s"
                      >
                        {Link.name}
                      </Text>
                    </Flex>
                  </Box>
                );
              })}
            </Box>
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
