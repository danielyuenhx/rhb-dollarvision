import React, { useState, useEffect } from 'react';
import {
  Flex,
  Card,
  CardBody,
  CardHeader,
  Box,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Tag,
  Input,
  Text,
  HStack,
  RadioGroup,
  Radio,
  color,
  useToast,
  FormErrorMessage,
  FormControl,
} from '@chakra-ui/react';
import supabase from '../../supabaseClient';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory } from '../../redux/categorySlice';

const UserCategory = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState();

  const categories = useSelector(state => state).category;
  const incomeColorSchemes = [
    'gray',
    'green',
    'teal',
    'blue',
    'cyan',
    'linkedin',
    'facebook',
    'messenger',
    'whatsapp',
    'twitter',
    'telegram',
  ];

  const expenseColorSchemes = [
    'red',
    'orange',
    'yellow',
    'pink',
    'purple',
    'gray',
  ];

  // https://github.com/chakra-ui/chakra-ui/discussions/2846 list of color schemes
  const [name, setName] = useState('');
  const handleNameChange = e => setName(e.target.value);
  const isError = name === '';

  const [type, setType] = useState('income');
  const handleTypeChange = e => setType(e);

  const dispatch = useDispatch();
  const toast = useToast();

  const addHandler = () => {
    if (!isError) {
      let colorArray;
      if (type === 'income') {
        colorArray = incomeColorSchemes;
      } else {
        colorArray = expenseColorSchemes;
      }
      const color = colorArray[Math.floor(Math.random() * colorArray.length)];

      dispatch(createCategory(name, type, color));

      onClose();
      toast({
        title: 'Category created!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Budget Categories</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isInvalid={isError}>
              <Input
                placeholder="Category Name"
                value={name}
                onChange={handleNameChange}
              />
              {isError && (
                <FormErrorMessage>Name is required.</FormErrorMessage>
              )}
            </FormControl>
            <RadioGroup
              defaultValue={type}
              marginTop="1.5rem"
              onChange={handleTypeChange}
            >
              <HStack spacing="24px">
                <Radio value="income">Income</Radio>
                <Radio value="expense">Expense</Radio>
              </HStack>
            </RadioGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              variant="solid"
              onClick={addHandler}
              disabled={isError}
            >
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Card w="100%">
        <CardHeader
          fontSize="2xl"
          color="white"
          fontWeight="bold"
          bgColor="secondaryBlue"
          borderTopLeftRadius="inherit"
          borderTopRightRadius="inherit"
        >
          <Flex justify="space-between">
            Categories
            <Button colorScheme="blue" variant="solid" onClick={onOpen}>
              Add Category
            </Button>
          </Flex>
        </CardHeader>
        <CardBody>
          <Flex direction="column" justifyContent="flex-start" gap="0.25rem">
            <Text fontSize="1.1rem" fontWeight="bold">
              Income Categories
            </Text>
            <Flex gap="1rem" marginBottom="0.75rem">
              {categories?.incomeCategories?.map(category => {
                return (
                  <Box key={category.id} w="auto" borderRadius="10px">
                    <Tag colorScheme={category.color} size="lg">
                      {category.name}
                    </Tag>
                  </Box>
                );
              })}
            </Flex>
            <Text fontSize="1.1rem" fontWeight="bold">
              Expense Categories
            </Text>
            <Flex gap="1rem">
              {categories?.expenseCategories?.map(category => {
                return (
                  <Box key={category.id} w="auto" borderRadius="10px">
                    <Tag colorScheme={category.color} size="lg">
                      {category.name}
                    </Tag>
                  </Box>
                );
              })}
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default UserCategory;
