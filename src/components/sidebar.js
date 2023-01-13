import { Box, IconButton, Text, Flex, Avatar } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWallet,
  faPiggyBank,
  faMoneyBill,
  faAward,
  faChartSimple,
} from '@fortawesome/free-solid-svg-icons';

export const Sidebar = () => {
  const navigate = useNavigate();

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
      path: '/gamification',
      name: 'Gamification',
      icon: <FontAwesomeIcon icon={faAward} color="white" />,
    },
  ];

  return (
    <Box bgColor="white" h="100vh" minWidth="250px" px="1.5%" position="sticky" top="0">
      <Flex justify="space-between" direction="column" h="100%">
        <Box marginTop="50px">
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
                  backgroundColor: 'backgroundColor',
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
          onClick={() => navigate('/profile')}
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
            backgroundColor: 'backgroundColor',
            transform: `scale(1.1)`,
          }}
        >
          <Avatar />
          <Text as="b">Profile</Text>
        </Flex>
      </Flex>
    </Box>
  );
};
