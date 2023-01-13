import { Box, Flex } from '@chakra-ui/layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const iconItem = ({ text, icon }) => {
  return (
    <Flex
      direction="column"
      textAlign="center"
    >
      <Box
        w="100px"
        h="100px"
        borderRadius="100%"
        backgroundColor="secondaryBlue"
        cursor="pointer"
      >
        <FontAwesomeIcon icon={icon} color="black" size="xl" />
      </Box>
      {text}
    </Flex>
  );
};

export default iconItem;
