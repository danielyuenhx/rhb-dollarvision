import React, { useState } from 'react';
import {
  Button,
  Flex,
  ModalContent,
  ModalBody,
  ModalHeader,
  Select,
  ModalCloseButton,
  Input,
  InputGroup,
  InputLeftAddon
} from '@chakra-ui/react';

const AddModal = () => {
  const [value, setValue] = useState();
  const handleChange = event => setValue(event.target.value);

  const proceedHandler = async () => {};

  return (
    <ModalContent pb="20px">
      <ModalHeader>
        <ModalCloseButton />
        <Flex justifyContent="space-between" alignItems="center">
          Add Budgets
        </Flex>
      </ModalHeader>
      <ModalBody>
        <Flex gap="30px" direction="column">
          {/* Budget Category */}
          <Flex>
            <Select placeholder="Select category">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </Flex>

          {/* Set Price */}
          <Flex>
            <InputGroup>
              <InputLeftAddon children="RM" />
              <Input
                placeholder="Set an amount for your budget"
                onChange={handleChange}
                type="number"
              />
            </InputGroup>
          </Flex>

          {/* Confirmation */}
          <Flex direction="column" gap="20px" textAlign="center">
            <Button onClick={proceedHandler}>Create Budget</Button>
          </Flex>
        </Flex>
      </ModalBody>
    </ModalContent>
  );
};

export default AddModal;
