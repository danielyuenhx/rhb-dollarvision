import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Tag,
  TagLabel,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

const UserCard = () => {
  // FOR AURORA EFFECT
  const [first, setFirst] = useState(30);
  const [second, setSecond] = useState(70);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (first > 70) {
        setReverse(true);
      } else if (first < 10) {
        setReverse(false);
      }

      if (reverse) {
        setFirst(first - 1);
        setSecond(second - 1);
      } else {
        setFirst(first + 1);
        setSecond(second + 1);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [first, second, reverse]);

  const [aDigit, setADigit] = useState(0);
  const [bDigit, setBDigit] = useState(0);

  const [turnA, setTurnA] = useState(false);
  const [turnB, setTurnB] = useState(false);

  const [degree, setDegree] = useState(0);
  const [reverseDeg, setReverseDeg] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (aDigit > 70) {
        setTurnA(true);
      } else if (aDigit === 0) {
        setTurnA(false);
      }

      if (bDigit > 70) {
        setTurnB(true);
      } else if (bDigit === 0) {
        setTurnB(false);
      }

      if (turnA === false && turnB === false) {
        setADigit(aDigit => aDigit + 1);
      } else if (turnA === false && turnB === true) {
        setBDigit(bDigit => bDigit - 1);
      } else if (turnA === true && turnB === false) {
        setBDigit(bDigit => bDigit + 1);
      } else if (turnA === true && turnB === true) {
        setADigit(aDigit => aDigit - 1);
      }

      if (degree >= 360) {
        setReverseDeg(true);
      } else if (degree <= 10) {
        setReverseDeg(false);
      }

      if (reverseDeg) {
        setDegree(degree - 1);
      } else {
        setDegree(degree + 1);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [aDigit, bDigit, degree, reverse, reverseDeg, turnA, turnB]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const colors = [
    { type: 'Food', color: 'purple' },
    { type: 'Entertainment', color: 'red' },
    { type: 'Shopping', color: 'teal' },
    { type: 'Transportation', color: 'yellow' },
    { type: 'Electronics', color: 'green' },
    { type: 'Travel', color: 'blue' },
  ];

  return (
    <Flex
      display="flex"
      flexDirection={['column', 'column', 'column', 'column', 'row']}
      gap="30px"
      alignItems={['center', 'center', 'center', 'center', 'space-between']}
    >
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Behaviour Card Explain</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex gap="15px" flexWrap="wrap">
              {colors.map(color => {
                return (
                  <Tag
                    key={color.type}
                    variant="solid"
                    colorScheme={color.color}
                    size="lg"
                  >
                    {color.type}
                  </Tag>
                );
              })}
            </Flex>
            <Flex marginTop="30px" dir="column" flexWrap="wrap">
              <Text fontWeight="bold">Based on your spending habits</Text>
              <UnorderedList>
                <ListItem>
                  You spent a lot on food, do you cafe hop all the time?
                </ListItem>
                <ListItem>
                  Almost 25% of your budget are spent in shopping, that is a bit
                  excessive isn't it?
                </ListItem>
                <ListItem>
                  Transportation the category that you spent the least money on.
                  Good job!
                </ListItem>
                <ListItem>
                  Entertainment is a big part of your spending habit as well.
                </ListItem>
              </UnorderedList>
            </Flex>

            <Text fontWeight="bold"  marginTop="20px">Your top category is</Text>
            <Flex gap="15px" marginBottom="20px" marginTop="5px">
              <Tag variant="solid" colorScheme="purple" size="lg">
                Food
              </Tag>
              <Tag variant="solid" colorScheme="teal" size="lg">
                Shopping
              </Tag>
            </Flex>

            <Text textAlign="justify">
              There are a total of 6 different colours and each of them
              represents different meaning. The algorithm will select and
              combine the two most significant colours based on your spending
              behaviour and create your very own personal unique card. The card
              will auto regenerate at the end of every month.
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Card
        height="400px"
        width="300px"
        onClick={onOpen}
        _hover={{ cursor: 'pointer' }}
      >
        <CardBody>
          <Box
            borderTopRightRadius="50%"
            borderBottomLeftRadius="50%"
            width="100%"
            height="70%"
            // background={`linear-gradient(${degree}deg, #22c1c3 0%, #22c1c3 ${first}%, #8d54ff ${second}%)`}
            background={`linear-gradient(${degree}deg, rgba(141, 84, 255,1), rgba(34, 193, 195 ,0.5) 70.71%),
        linear-gradient(127deg, rgba(34, 193, 195,1) , rgba(141, 84, 255,0.5) 70.71%)`}
          ></Box>
          <Text fontSize="3xl" fontWeight="bold" mt="10px">
            Zheng Jie
          </Text>
          <Text fontSize="15px">Omega Spender</Text>
        </CardBody>
        <CardFooter>
          <Flex w="100%" justify="space-between" alignItems="flex-end">
            <Tag variant="outline" h="20px" w="auto">
              <TagLabel>11 / 12 / 2023</TagLabel>
            </Tag>
            <Flex textAlign="right" justifyContent="flex-end" maxWidth="80px">
              <Text fontWeight="bold">Behaviour Card</Text>
            </Flex>
          </Flex>
        </CardFooter>
      </Card>

      <Card
        w={['100%', '100%', '100%', '100%', 'auto']}
        height={['100%', '100%', '100%', '100%', '400px']}
      >
        <CardBody p="3%">
          <Text fontSize="3xl" fontWeight="bold">
            Welcome back to Dollar-Vision, <br></br>Zheng Jie
          </Text>
          <Box width="85%" mt="5%">
            <Text color="gray.500">
              We noticed that you spend a little too much latety, time to tone
              it back down. Saving is more important!
            </Text>
          </Box>

          <Box width="85%">
            <UnorderedList spacing="10px" mt={['5%', '5%', '2%', '2%%', '2%']}>
              <ListItem color="green.500">
                Think whether is it a neccessary item to buy.
              </ListItem>
              <ListItem color="green.500">
                Subscribe to a Netflix account rather than going to the theater.
              </ListItem>
              <ListItem color="green.500">Eat out less and cook more.</ListItem>
              <ListItem color="red.500">
                Do not buy an expensive item under peer pressure.
              </ListItem>
              <ListItem color="red.500">
                Do not indulge in expensive cafes or restaurant all the time.
              </ListItem>
            </UnorderedList>
          </Box>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default UserCard;
