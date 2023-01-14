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
} from '@chakra-ui/react';
import supabase from '../../supabaseClient';

const UserCategory = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState();

  const addHandler = () => {};

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      await supabase
        .from('categories')
        .select('*')
        .eq('type', 'expense')
        .then(res => setData(res));
    };

    fetchData().catch(console.error);
  }, []);

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
          <Flex gap="40px" justify="flex-start" flexWrap="wrap">
            {data?.data?.map(category => {
              return (
                <Box key={category.id} w="auto" borderRadius="10px">
                  <Tag colorScheme="gray" size="lg">
                    {category.name}
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
