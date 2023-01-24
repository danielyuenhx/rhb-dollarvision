import React from 'react';
import {
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Flex,
  SlideFade,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { updateModalName } from '../../../redux/modalSlice';

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
        >
          {/* first section */}
          <SlideFade
            direction="left"
            in={props.isOpen}
            delay={0.5}
            offsetY={-200}
          >
            <Flex width="100%" direction="column">
              <Text fontSize="6xl" fontWeight="bold">
                2023
              </Text>
            </Flex>
          </SlideFade>

          <SlideFade direction="left" in={props.isOpen} delay={1.2}>
            <Flex width="80%" direction="column" marginY="5%" marginX="auto">
              <Text fontSize="2xl">
                We have tracked your spending behaviour and expenses throughout
                the year.
              </Text>
            </Flex>
          </SlideFade>

          <SlideFade in={props.isOpen} delay={0.5} offsetY={200}>
            <Flex width="100%" direction="column">
              <Text fontSize="6xl" fontWeight="bold">
                2023
              </Text>
            </Flex>
          </SlideFade>
        </Flex>
      </ModalBody>
      <ModalFooter>
        <Button onClick={nextHandler}>Discover</Button>
      </ModalFooter>
    </ModalContent>
  );
};

export default FirstPage;
