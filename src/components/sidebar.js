import {
  Box,
  IconButton,
  Text,
  Flex,
  Avatar,
  useColorMode,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWallet,
  faPiggyBank,
  faMoneyBill,
  faAward,
  faChartSimple,
} from '@fortawesome/free-solid-svg-icons';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

export const Sidebar = () => {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  const sideBarList = [
    {
      path: '/',
      name: 'Overview',
      icon: <FontAwesomeIcon icon={faChartSimple} color="white" />,
    },
    {
      path: '/piggybank',
      name: 'Piggy Bank',
      icon: <FontAwesomeIcon icon={faPiggyBank} color="white" />,
    },
    {
      path: '/wallet',
      name: 'Wallet',
      icon: <FontAwesomeIcon icon={faWallet} color="white" />,
    },
    {
      path: '/budget',
      name: 'Budget',
      icon: <FontAwesomeIcon icon={faMoneyBill} color="white" />,
    },
    {
      path: '/rewards',
      name: 'Rewards',
      icon: <FontAwesomeIcon icon={faAward} color="white" />,
    },
  ];

  return (
    <Box
      bgColor={colorMode === 'light' ? 'white' : 'gray.700'}
      h="100vh"
      minWidth="250px"
      px="1.5%"
      position="sticky"
      top="0"
    >
      <Flex justify="space-between" direction="column" h="100%">
        <Box marginTop="50px" textAlign="center">
          <Text as="b" fontSize="3xl" fontWeight="bold">
            Dollar-Vision
          </Text>

          {sideBarList.map(Link => {
            return (
              <Box
                key={Link.name}
                onClick={() => navigate(Link.path)}
                cursor="pointer"
                height="60px"
                mt="10%"
                borderRadius="10px"
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
                transitionDuration="0.2s"
                pl="10%"
                gap="10%"
                _hover={{
                  backgroundColor: colorMode === 'light' ? 'white' : 'gray.800',
                  transform: `scale(1.1)`,
                }}
              >
                <IconButton
                  bgColor="secondaryBlue"
                  _hover={{ bgColor: 'secondaryBlue' }}
                >
                  {Link.icon}
                </IconButton>
                <Text as="b">{Link.name}</Text>
              </Box>
            );
          })}
        </Box>
        <Flex
          cursor="pointer"
          borderRadius="10px"
          gap="10%"
          justifyContent="flex-start"
          pl="10%"
          marginBottom="10%"
          height="60px"
          alignItems="center"
          transitionDuration="0.2s"
          _hover={{
            backgroundColor: colorMode === 'light' ? 'white' : 'gray.800',
            transform: `scale(1.1)`,
          }}
        >
          <Flex onClick={() => navigate('/profile')} justify="space-between" alignItems="center" w="55%"> 
            <Avatar size="sm" />
            <Text as="b">Profile</Text>
          </Flex>

          <ColorModeSwitcher />
        </Flex>
      </Flex>
    </Box>
  );
};
