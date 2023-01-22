import React, { Fragment } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
  Flex,
  Slide,
  SlideFade,
  Tag,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { updateModalName } from '../../../redux/modalSlice';

const FirstPage = props => {
  const dispatch = useDispatch();

  const nextHandler = () => {
    dispatch(updateModalName('Second'));
  };

  return (
    <ModalContent>
      {/* <ModalHeader>
      <Text opacity="0">dummy text</Text>
    </ModalHeader> */}
      <ModalCloseButton />
      <ModalBody>
        <Flex direction="column">
          {/* first section */}
          <SlideFade direction="left" in={props.isOpen} delay={0.5} offsetX={500}>
            <Flex
              marginTop="80px"
              width="30%"
              bgColor="teal"
              // height="200px"
              transitionDuration={3000}
            >
              test
            </Flex>
          </SlideFade>

          {/* second section */}
          <SlideFade direction="left" in={props.isOpen} delay={0.8}>
            <Flex marginTop="20px" width="100%" direction="column">
              <Text fontSize="4xl" fontWeight="bold">
                This Year
              </Text>
              <Text fontSize="2xl">You have spent a total of RM 12000</Text>
              <Text fontSize="2xl">
                Averagely RM 1000 each month which is pretty decent!
              </Text>
            </Flex>
          </SlideFade>

          {/* third section */}
          <SlideFade direction="left" in={props.isOpen} delay={1.2}>
            <Flex marginTop="20px" width="100%" direction="column">
              <Text fontSize="4xl" fontWeight="bold">
                Your top categories are
              </Text>
              <Flex gap="15px" marginBottom="20px" marginTop="5px">
                <Tag variant="solid" colorScheme="purple" size="lg">
                  Food
                </Tag>
                <Tag variant="solid" colorScheme="teal" size="lg">
                  Shopping
                </Tag>
              </Flex>
            </Flex>
          </SlideFade>
        </Flex>
      </ModalBody>
      <ModalFooter>
        <Button onClick={nextHandler}>Next</Button>
      </ModalFooter>
    </ModalContent>
  );
};

export default FirstPage;
