import { defineStyleConfig } from '@chakra-ui/react';

export const Button = defineStyleConfig({
  // The styles all button have in common
  baseStyle: {
    fontWeight: 'bold',
    textTransform: 'none',
    borderRadius: '10px', 
  },
  // Two sizes: sm and md
  sizes: {
    sm: {
      fontSize: 'sm',
      px: 4, // <-- px is short for paddingLeft and paddingRight
      py: 3, // <-- py is short for paddingTop and paddingBottom
    },
    md: {
      fontSize: 'md',
      px: 6, // <-- these values are tokens from the design system
      py: 4, // <-- these values are tokens from the design system
    },
  },
  variants: {
    primaryButton: {
      backgroundColor: 'secondaryBlue',
      variant: 'solid',
      // transitionDuration: '0.3s',
      width: '100%',
      color: 'white',
      _hover: {
        // backgroundColor: 'primaryBlue',
        color: 'white',
        transform: `scale(1.02)`,
      },
    },
    whiteButton: {
      borderWidth: '2px',
      borderColor: 'black',
      variant: 'outline',
      // transitionDuration: '0.3s',
      width: '100%',
      _hover: {
        transform: `scale(1.02)`,
      },
    },
  },
  // The default size and variant values
  defaultProps: {
    size: 'md',
    variant: 'outline',
  },
});
