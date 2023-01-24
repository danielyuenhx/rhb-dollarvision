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
  ListItem,
  UnorderedList,
  CardHeader,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import FirstPage from './modals/firstPage';
import SecondPage from './modals/secondPage';
import { useSelector, useDispatch } from 'react-redux';
import { updateModalName } from '../../redux/modalSlice';
import ThirdPage from './modals/thirdPage';

const UserCard = props => {
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
    }, 20);

    return () => clearInterval(interval);
  }, [aDigit, bDigit, degree, reverse, reverseDeg, turnA, turnB]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const current = useSelector(state => state.modal.currentModalName);
  const dispatch = useDispatch();

  const renderModal = () => {
    // console.log(current === 'First');
    if (current === 'First') {
      return <FirstPage isOpen={isOpen} />;
    } else if (current === 'Second') {
      return <SecondPage isOpen={isOpen} />;
    } else if (current === 'Third') {
      return <ThirdPage isOpen={isOpen} onClose={onClose}/>;
    }
  };

  const cardHandler = () => {
    onOpen();
    dispatch(updateModalName('First'));
  };

  return (
    <Flex
      display="flex"
      flexDirection={['column', 'column', 'column', 'column', 'row']}
      gap="30px"
      alignItems={['center', 'center', 'center', 'center', 'space-between']}
    >
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
        <ModalOverlay />
        {renderModal()}
      </Modal>

      <Card
        height="400px"
        width="320px"
        onClick={cardHandler}
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
            Daniel Yuen
          </Text>
          <Text fontSize="15px">High Maintenance</Text>
        </CardBody>
        <CardFooter>
          <Flex w="100%" justify="space-between" alignItems="flex-end">
            <Tag variant="outline" h="20px" w="auto">
              <TagLabel>11 / 01 / 2023</TagLabel>
            </Tag>
            <Flex textAlign="right" justifyContent="flex-end" maxWidth="80px">
              <Text fontWeight="bold">Behaviour Card</Text>
            </Flex>
          </Flex>
        </CardFooter>
      </Card>

      {props.wrapped ? null : (
        <Card
          w={['100%', '100%', '100%', '100%', '90%']}
          height={['100%', '100%', '100%', '100%', '400px']}
        >
          <CardHeader
            fontSize="2xl"
            color="white"
            fontWeight="bold"
            bgColor="secondaryBlue"
            borderTopLeftRadius="inherit"
            borderTopRightRadius="inherit"
          >
            Tips
          </CardHeader>
          <CardBody p="3%">
            <Box width="85%">
              <Text color="gray.500">
                We noticed that you have been going above your budget lately.
                Remember: a dollar saved is a dollar earned.
              </Text>
            </Box>

            <Box width="85%">
              <UnorderedList
                spacing="10px"
                mt={['5%', '5%', '2%', '2%%', '2%']}
              >
                <ListItem color="green.500">Only buy necessities.</ListItem>
                <ListItem color="green.500">
                  Subscribe to a Netflix account rather than spending money on
                  entertainment.
                </ListItem>
                <ListItem color="green.500">
                  Eat out less and cook more.
                </ListItem>
                <ListItem color="red.500">
                  Do not buy an expensive item under peer pressure.
                </ListItem>
                <ListItem color="red.500">
                  Do not indulge in expensive cafes or restaurants all the time.
                </ListItem>
              </UnorderedList>
            </Box>
          </CardBody>
        </Card>
      )}
    </Flex>
  );
};

export default UserCard;
