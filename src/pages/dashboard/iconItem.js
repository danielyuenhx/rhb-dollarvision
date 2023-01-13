import { Box, Flex } from '@chakra-ui/layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaCreditCard } from 'react-icons/fa';
import React from 'react';

const iconItem = ({ text, icon }) => {
  return (
    <Flex
      direction="column"
      textAlign="center"
      justifyContent="flex-start"
      alignItems="center"
      verticalAlign="top"
      gap="10px"
    >
      <Flex
        w="100px"
        h="100px"
        borderRadius="100%"
        backgroundColor="secondaryBlue"
        cursor="pointer"
        justifyContent="center"
        alignItems="center"
      >
        {icon}
      </Flex>
      {text}
    </Flex>
  );
};

export default iconItem;
