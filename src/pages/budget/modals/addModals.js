import React, { useState, useEffect } from 'react';
import {
  Button,
  Flex,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  useToast,
} from '@chakra-ui/react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useDispatch, useSelector } from 'react-redux';
import { useCategories } from '../../../hooks/useCategories';
import { createBudget } from '../../../api';
import * as api from '../../../api/index';

const AddModal = (props) => {
  const [amount, setAmount] = useState();
  const [name, setName] = useState();
  const [choice, setChoice] = useState();
  const [desc, setDesc] = useState();

  let categoryNames = [];
  let selectedCategoryIds = [];

  const categories = useCategories();

  categories?.data
    ?.filter(category => {
      return category.type === 'expense';
    })
    .map(category => {
      return categoryNames.push({
        value: category.name,
        label: category.name,
        id: category.id,
      });
    });

  const animatedComponents = makeAnimated();

  const handleAmountChange = event => setAmount(event.target.value);
  const handleNameChange = event => setName(event.target.value);
  const handleChoiceChange = event => setChoice(event);
  const handleDescChange = event => setDesc(event.target.value);

  const toast = useToast();

  const proceedHandler = async e => {
    e.preventDefault();

    choice.filter(category => {
      selectedCategoryIds.push(category.id);
    });


    try {
      const data = await api
        .createBudget(name, desc, amount, selectedCategoryIds)
        .then(res => console.log(res));
      // console.log(data);
      toast({
        title: 'Budget created!',
        description: `Budget named ${name} is created with a limit of RM ${amount}.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (e) {
      console.log(e);
      toast({
        title: 'Failed',
        description: `An error occured.`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }

    selectedCategoryIds = [];
    props.onclose();
  };

  return (
    <ModalContent pb="20px">
      <ModalHeader>
        <ModalCloseButton />
        <Flex justifyContent="space-between" alignItems="center">
          Add Budgets
        </Flex>
      </ModalHeader>
      <ModalBody>
        <Flex gap="20px" direction="column">
          {/* Name */}
          <Flex gap="20px" direction="column">
            <Text fontWeight="bold">Name for the budget</Text>
            <Input placeholder="Lunch Budget" onChange={handleNameChange} />
          </Flex>

          <Flex gap="20px" direction="column">
            <Text fontWeight="bold">Short description</Text>
            <Input
              placeholder="Daily lunch at office"
              onChange={handleDescChange}
            />
          </Flex>

          {/* Budget Category */}
          <Flex direction="column">
            <Text fontWeight="bold">Category</Text>
            <Text fontSize="sm" as="i">
              Tips: you can select more than 1 category for your budgeting
            </Text>
          </Flex>

          <Select
            options={categoryNames}
            isMulti
            value={choice}
            placeholder="Select categories"
            components={animatedComponents}
            onChange={handleChoiceChange}
          />

          {/* Set Price */}
          <Flex gap="20px" direction="column">
            <Text fontWeight="bold">Budget amount</Text>
            <InputGroup>
              <InputLeftAddon children="RM" />
              <Input
                placeholder="500"
                onChange={handleAmountChange}
                type="number"
              />
            </InputGroup>
          </Flex>

          {/* Confirmation */}
          <Flex direction="column" gap="20px" textAlign="center">
            <Button onClick={proceedHandler} colorScheme="blue" variant="solid">
              Create Budget
            </Button>
          </Flex>
        </Flex>
      </ModalBody>
    </ModalContent>
  );
};

export default AddModal;
