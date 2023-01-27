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

const ThirdPage = props => {
  return (
    <ModalContent>
      {/* <ModalHeader>
            <Text opacity="0">dummy text</Text>
          </ModalHeader> */}
      <ModalCloseButton />
      <ModalBody
        minHeight="500px"
        background={`linear-gradient(180deg, rgba(61,187,245,1) 0%, rgba(255,255,255,1) 100%)`}
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
                Budgeting
              </Text>
              <Text fontSize="20px">
                Congratulations! You did not overspend on a single budget
                throughout the entire year.
              </Text>
            </Flex>
          </SlideFade>

          {/* second section */}
          <SlideFade direction="left" in={props.isOpen} delay={1.2}>
            <Flex
              direction="column"
              justify="center"
              alignItems="center"
              textAlign="center"
            >
              <Flex marginTop="40px" width="70%" direction="column">
                <Text fontSize="20px" fontWeight="bold">
                  Catogories that you are least likely to go over budget
                </Text>
              </Flex>

              <Flex gap="100px" justify="flex-start" textAlign="flex-start">
                <Flex gap="15px" marginBottom="20px" marginTop="5px">
                  <Tag variant="solid" colorScheme="blue" size="lg">
                    Transport
                  </Tag>
                  <Tag variant="solid" colorScheme="red" size="lg">
                    Entertainment
                  </Tag>
                </Flex>
              </Flex>
            </Flex>
          </SlideFade>

          {/* third section */}
          <SlideFade direction="left" in={props.isOpen} delay={1.6}>
            <Flex
              marginTop="40px"
              width="80%"
              direction="column"
              textAlign="center"
              marginX="auto"
              justify="center"
            >
              <Text fontSize="20px">
                You have spent the least on July, With a total spending of{' '}
                <span style={{ color: 'green', fontWeight: 'bold' }}>
                  RM 1800
                </span>
                !
              </Text>
              <StatGroup mt="20px" gap="100px" width="80%" marginX="auto">
                <Stat>
                  <StatLabel>Food Category</StatLabel>
                  <StatNumber>RM 700</StatNumber>
                  <StatHelpText>
                    <StatArrow type="decrease" color="green" />
                    23.36%
                  </StatHelpText>
                </Stat>

                <Stat>
                  <StatLabel>Food Category</StatLabel>
                  <StatNumber>RM 600</StatNumber>
                  <StatHelpText>
                    <StatArrow type="decrease" color="green" />
                    9.05%
                  </StatHelpText>
                </Stat>
              </StatGroup>
            </Flex>
          </SlideFade>
        </Flex>
      </ModalBody>
      <ModalFooter>
        <Button onClick={() => props.onClose()}>Close</Button>
      </ModalFooter>
    </ModalContent>
  );
};

export default ThirdPage;
