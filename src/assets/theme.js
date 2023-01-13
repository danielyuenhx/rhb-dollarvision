import { extendTheme } from '@chakra-ui/react';
import { Button } from '../components/button';

const colors = {
  primaryBlue: '#3dbbf5',
  secondaryBlue: '#0067b1',
  backgroundColor: '#f5f5f5'
};

const components = {
  Button,
};

export const theme = extendTheme({ colors, components });
