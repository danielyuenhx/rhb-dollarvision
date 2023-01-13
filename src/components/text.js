import { defineStyleConfig } from '@chakra-ui/react';

export const Text = defineStyleConfig({
  // The styles all button have in common
  baseStyle: {
    color: 'gray.700',
    _dark: {
      color: 'white',
    },
  },
});
