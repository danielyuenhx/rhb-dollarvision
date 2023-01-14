import React from 'react';
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
} from '@chakra-ui/react';

const UserCategory = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const category = [
    { title: 'Food' },
    { title: 'Entertainment' },
    { title: 'Shopping' },
    { title: 'Transport' },
  ];

  const addHandler = () => {};

  return (
    <Flex>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Budget Categories</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input placeholder="Category Name" />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" variant="solid" onClick={addHandler}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Card w="100%">
        <CardHeader
          fontSize="2xl"
          fontWeight="bold"
          bgColor="primaryBlue"
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
          <Flex gap="40px" justify="flex-start" flexWrap="wrap">
            {category.map((category, index) => {
              return (
                <Box key={category + index} w="auto" borderRadius="10px">
                  <Tag colorScheme="gray" size="lg">
                    {' '}
                    {category.title}
                  </Tag>
                </Box>
              );
            })}
          </Flex>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default UserCategory;
