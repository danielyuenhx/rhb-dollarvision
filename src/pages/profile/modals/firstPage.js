import React from 'react';
import {
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Flex,
  keyframes,
  Slide,
  SlideFade,
  Box,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { updateModalName } from '../../../redux/modalSlice';
import { motion } from 'framer-motion';

const animation = keyframes`
  0% {
    background-position: 0;
  }
  100% {
    background-position: 100%;
  }`;

const FirstPage = props => {
  const dispatch = useDispatch();

  const nextHandler = () => {
    dispatch(updateModalName('Second'));
  };

  return (
    <ModalContent height="600px">
      {/* <ModalHeader>
      <Text opacity="0">dummy text</Text>
    </ModalHeader> */}
      <ModalCloseButton />
      <ModalBody minHeight="500px">
        <Flex
          direction="column"
          textAlign="center"
          justifyContent="center"
          alignItems="center"
          height="100%"
          gap="2rem"
          marginTop="1rem"
        >
          {/* first section */}
          <Box
            as={motion.div}
            // direction="left"
            // in={props.isOpen}
            // delay={0.5}
            // offsetY={-200}
            initial={{ y: -200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: 'easeInOut', duration: 1, delay: 1 }}
            style={{ width: '100%' }}
          >
            <Flex
              width="100%"
              direction="column"
              backgroundColor={'#3dbbf5'}
              backgroundImage={
                "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2382c3f2' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E\")"
              }
              animation={`${animation} 10s infinite linear`}
            >
              <Text fontSize="6xl" fontWeight="bold" color="white">
                2022
              </Text>
            </Flex>
          </Box>

          <SlideFade direction="left" in={props.isOpen} delay={0.5}>
            <Flex width="80%" direction="column" marginY="5%" marginX="auto">
              <Text fontSize="2xl" fontWeight="semibold">
                We tracked your spending behaviour and expenses throughout the
                year. Here's a quick summary.
              </Text>
            </Flex>
          </SlideFade>

          <Box
            as={motion.div}
            // direction="left"
            // in={props.isOpen}
            // delay={0.5}
            // offsetY={-200}
            initial={{ y: 200, opacity: 1 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: 'easeInOut', duration: 1, delay: 1 }}
            style={{ width: '100%' }}
          >
            <Flex
              width="100%"
              direction="column"
              backgroundColor={'#3dbbf5'}
              backgroundImage={
                "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2382c3f2' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E\")"
              }
              animation={`${animation} 10s infinite linear`}
            >
              <Text fontSize="6xl" fontWeight="bold" color="white">
                2022
              </Text>
            </Flex>
          </Box>
        </Flex>
      </ModalBody>
      <ModalFooter>
        <Button onClick={nextHandler}>Discover</Button>
      </ModalFooter>
    </ModalContent>
  );
};

export default FirstPage;
