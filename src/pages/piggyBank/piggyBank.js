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
  Spinner,
  Text,
} from '@chakra-ui/react';
import supabase from '../../supabaseClient';

import ItemDetails from './itemDetails';
import ItemCard from './itemCard';

const PiggyBank = () => {
  const [selectedItem, setSelectedItem] = useState(0);
  const [items, setItems] = useState();

  const [selectedPiggyBank, setSelectedPiggyBank] = useState();

  const PIGGYBANK_OPTIONS = [
    {
      name: 'Retirement Fund',
      desc: 'Funds for retiring comfortably',
      image:
        'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80',
    },
    {
      name: 'Education Fund',
      desc: "Ensure your children's future education",
      image: 'https://www.wilkes.edu/_images/wilkes-university.jpg',
    },
    {
      name: 'Investments',
      desc: 'Grow your wealth by setting aside funds for investing',
      image:
        // 'https://ocdn.eu/images/pulscms/NmE7MDA_/9800cac2d167fa9f826e41c7b25b968e.jpg',
        'https://i.kym-cdn.com/photos/images/newsfeed/001/499/826/2f0.png',
    },
    {
      name: 'Custom Piggy Bank',
      desc: 'Create your own custom goals',
      image:
        'https://kdvr.com/wp-content/uploads/sites/11/2022/03/best-piggy-bank-16f62d.jpg',
    },
  ];

  const onClickHandler = index => {
    setSelectedItem(index);
  };

  useEffect(() => {
    const getPiggybank = async () => {
      await supabase
        .from('piggybank')
        .select('name, desc, total, paid, per_month')
        .then(res => setItems(res.data));
    };
    getPiggybank();
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Layout>
      {items ? (
        <>
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
                  {PIGGYBANK_OPTIONS.map((option, index) => (
                    <Card
                      cursor="pointer"
                      onClick={setSelectedPiggyBank.bind(null, index)}
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
          </Modal>
        </>
      ) : (
        <Flex
          w="100%"
          marginTop="30vh"
          justifyContent="center"
          alignItems="center"
        >
          <Spinner
            size="xl"
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="secondaryBlue"
          />
        </Flex>
      )}
    </Layout>
  );
};

export default PiggyBank;
