import {
  Flex,
  HStack,
  SimpleGrid,
  VStack,
  Image,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import IconItem from './iconItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCreditCard,
  faHeart,
  faBuildingColumns,
} from '@fortawesome/free-solid-svg-icons';

const icons = () => {
  return (
    <VStack spacing="10px" marginTop="50px">
      <SimpleGrid columns={3} h="200px" spacing="15px">
        <IconItem
          text="Multi Currency Account Conversion"
          icon={<FontAwesomeIcon icon={faCreditCard} color="white" size="2x" />}
        />
        <IconItem
          text="ASNB Subscription"
          icon={
            <Text color="white" fontWeight="black" fontSize="1.5rem">
              ASNB
            </Text>
          }
        />
        <IconItem
          text="DuitNow"
          icon={
            <Image
              src="https://www.agrobank.com.my/wp-content/uploads/2021/06/DuitNow-QR-Logo_FA2.png"
              w="50px"
              h="55px"
            />
          }
        />
      </SimpleGrid>
      <SimpleGrid columns={2} h="200px" spacing="15px">
        <IconItem
          text="My Favourites"
          icon={<FontAwesomeIcon icon={faHeart} color="white" size="2x" />}
        />
        <IconItem
          text="e-FD Placement"
          icon={
            <FontAwesomeIcon icon={faBuildingColumns} color="white" size="2x" />
          }
        />
      </SimpleGrid>
    </VStack>
  );
};

export default icons;
