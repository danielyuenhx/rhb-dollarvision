import React from 'react';
import { Box } from '@chakra-ui/react';

const Layout = props => {
  return (
    <Box
      height="auto"
      marginX="auto"
      maxWidth="1300px"
      marginBottom={['200px', '200px', '200px', '200px', '100px']}
    >
      {props.children}
    </Box>
  );
};

export default Layout;
