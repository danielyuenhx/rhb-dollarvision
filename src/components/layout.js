import React from 'react';
import { Box } from '@chakra-ui/react';

const Layout = props => {
  return (
    <Box
      height="auto"
      marginX="auto"
      maxWidth="1200px"
      marginBottom={['200px', '200px', '200px', '200px', '0px']}
    >
      {props.children}
    </Box>
  );
};

export default Layout;
