import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout';
import {
  Button,
  Flex,
  Box,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalCloseButton,
  Card,
  SimpleGrid,
  CardHeader,
  CardBody,
} from '@chakra-ui/react';
import supabase from '../../supabaseClient';

import ItemDetails from './itemDetails';
import ItemCard from './itemCard';

const PiggyBank = () => {
  const [selectedItem, setSelectedItem] = useState(0);
  const [items, setItems] = useState();

  const [selectedPiggyBank, setSelectedPiggyBank] = useState();

  const onClickHandler = index => {
    setSelectedItem(index);
  };

  useEffect(() => {
    supabase
      .from('piggybank')
      .select('name, desc, total, paid, per_month')
      .then(res => setItems(res.data));
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Layout>
      <Flex gap="30px" direction="row">
        <Flex gap="25px" direction="column" w="50%">
          {items &&
            items.map((item, index) => (
              <ItemCard
                key={index}
                index={index}
                title={item.name}
                desc={item.desc}
                total={item.total}
                paid={item.paid}
                onClick={onClickHandler}
              />
            ))}
        </Flex>
        <Flex gap="20px" direction="column" w="100%">
          <Box>
            <Button
              variant="primaryButton"
              w="auto"
              _hover={{ transform: '' }}
              float="right"
              onClick={onOpen}
            >
              {' '}
              Add Piggy Bank
            </Button>
          </Box>
          {items && <ItemDetails selectedItem={items[selectedItem]} />}
        </Flex>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Piggy Bank</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={2} spacing={5}>
              <Card cursor="pointer" onClick={setSelectedPiggyBank}>
                <CardHeader fontWeight="bold">Retirement Fund</CardHeader>
                <CardBody>Funds for retiring comfortably</CardBody>
              </Card>
              <Card>
                <CardHeader fontWeight="bold">Education Fund</CardHeader>
                <CardBody>Ensure your children's future education</CardBody>
              </Card>
              <Card>
                <CardHeader fontWeight="bold">Investments</CardHeader>
                <CardBody>
                  Grow your wealth by setting aside funds for investing
                </CardBody>
              </Card>
              <Card>
                <CardHeader fontWeight="bold">Custom Piggy Bank</CardHeader>
                <CardBody>Create your own custom goals</CardBody>
              </Card>
            </SimpleGrid>
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Layout>
  );
};

export default PiggyBank;
