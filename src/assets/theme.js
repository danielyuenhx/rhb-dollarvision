import { extendTheme } from '@chakra-ui/react';
import { Button } from '../components/button';
import { Text } from '../components/text';
import { Card } from '../components/card';

const colors = {
  primaryBlue: '#3dbbf5',
  secondaryBlue: '#0067b1',
  backgroundColor: '#f5f5f5',
};

const components = {
  Button,
  Text,
  Card,
};

const fonts = {
  heading: `'Heebo', sans-serif`,
  body: `'Heebo', sans-serif`,
};

export const theme = extendTheme({ colors, components, fonts });
