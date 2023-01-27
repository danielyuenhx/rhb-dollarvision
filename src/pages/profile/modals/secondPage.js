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
  Tag,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { updateModalName } from '../../../redux/modalSlice';

const SecondPage = props => {
  const dispatch = useDispatch();

  const nextHandler = () => {
    dispatch(updateModalName('Third'));
  };

  return (
    <ModalContent>
      {/* <ModalHeader>
            <Text opacity="0">dummy text</Text>
          </ModalHeader> */}
      <ModalCloseButton />
      <ModalBody
        minHeight="500px"
        background={`linear-gradient(180deg, rgba(61,187,245,0.5) 0%, rgba(255,255,255,1) 100%)`}
        borderRadius="inherit"
      >
        <Flex direction="column">
          {/* first section */}
          <SlideFade direction="left" in={props.isOpen} delay={0.8}>
            <Flex
              marginTop="50px"
              width="80%"
              direction="column"
              marginX="auto"
              textAlign="center"
            >
              <Text fontSize="3xl" fontWeight="bold">
                Expenses
              </Text>
              <Text fontSize="20px">
                You have spent a total of RM12000 on expenses, and 30% of it is
                spent on Food.
              </Text>
            </Flex>
          </SlideFade>

          {/* second section */}
          <SlideFade direction="left" in={props.isOpen} delay={1.2}>
            <Flex
              marginTop="40px"
              width="100%"
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Text fontSize="20px" fontWeight="bold">
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

          {/* third section */}
          <SlideFade direction="left" in={props.isOpen} delay={1.6}>
            <Flex
              direction="column"
              justify="center"
              alignItems="center"
              textAlign="center"
            >
              <Flex marginTop="40px" width="100%" direction="column">
                <Text fontSize="20px">
                  You have spent the most on March, With a total spending of{' '}
                  <span style={{ color: 'red', fontWeight: 'bold' }}>
                    RM 3500
                  </span>
                  !
                </Text>
              </Flex>

              <StatGroup mt="20px" gap="100px" width="70%">
                <Stat>
                  <StatLabel>Shopping Category</StatLabel>
                  <StatNumber>RM 700</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" color="red" />
                    23.36%
                  </StatHelpText>
                </Stat>

                <Stat>
                  <StatLabel>Food Category</StatLabel>
                  <StatNumber>RM 600</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" color="red" />
                    9.05%
                  </StatHelpText>
                </Stat>
              </StatGroup>
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

export default SecondPage;
