import React from 'react';
import { Box } from '@chakra-ui/react';

const Layout = props => {
  return (
    <Box width="100vh" height="auto">
      {props.children}
    </Box>
  );
};

export default Layout;
