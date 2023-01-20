import React from 'react';
import {
  Box,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalCloseButton,
  Card,
  SimpleGrid,
  CardHeader,
  CardBody,
  Text,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { PIGGYBANK_OPTIONS } from '../../../data';
import { updateModalName } from '../../../redux/modalSlice';

const SelectionModal = () => {
  const dispatch = useDispatch();

  return (
    <ModalContent>
      <ModalHeader>Add New Piggy Bank</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <SimpleGrid columns={2} spacing={5}>
          {PIGGYBANK_OPTIONS.map((option, index) => (
            <Card
              cursor="pointer"
              onClick={() => dispatch(updateModalName(option.name))}
              transform="scale(1)"
              _hover={{
                transform: 'scale(1.02)',
                transitionDuration: '0.2s',
              }}
            >
              <CardHeader fontWeight="bold">
                <Box
                  position="absolute"
                  left="0"
                  top="0"
                  height="70px"
                  width="100%"
                  backgroundImage={`url(${option.image})`}
                  backgroundSize="100%"
                  objectFit="cover"
                  backgroundRepeat="no-repeat"
                  borderRadius="5px 5px 0 0"
                  zIndex="-1"
                />
                <Text
                  fontWeight="bold"
                  color="white"
                  textShadow="2px 2px 10px #000000"
                  fontSize="20px"
                >
                  {option.name}
                </Text>
              </CardHeader>
              <CardBody>{option.desc}</CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </ModalBody>
      <ModalFooter></ModalFooter>
    </ModalContent>
  );
};

export default SelectionModal;
