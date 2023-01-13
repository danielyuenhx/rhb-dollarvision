import { Grid, Text, useColorMode } from '@chakra-ui/react';
import React from 'react';

const Footer = () => {
  const { colorMode } = useColorMode();
  return (
    <Grid
      position="fixed"
      bottom="0"
      bgColor={colorMode === 'light' ? 'white' : 'gray.700'}
      width="100vw"
      h="80px"
      zIndex="10"
    >
      <Text fontSize="3xl">Footer</Text>
    </Grid>
  );
};

export default Footer;
