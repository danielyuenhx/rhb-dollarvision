import React, { useEffect, useState, useRef, useCallback } from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';
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
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Select,
  Input,
  InputLeftAddon,
  InputGroup,
} from '@chakra-ui/react';
import supabase from '../../supabaseClient';
import { Player } from '@lottiefiles/react-lottie-player';
import ItemDetails from './itemDetails';
import ItemCard from './itemCard';

const canvasStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  zIndex: '1000',
};

function getAnimationSettings(angle, originX) {
  return {
    particleCount: 3,
    angle,
    spread: 55,
    origin: { x: originX },
  };
}

const PiggyBank = () => {
  const [selectedItem, setSelectedItem] = useState(0);
  const [items, setItems] = useState();

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
      name: 'Assets',
      desc: 'Save up for a new house or car',
      image:
        'https://kdvr.com/wp-content/uploads/sites/11/2022/03/best-piggy-bank-16f62d.jpg',
    },
  ];

  const onClickHandler = index => {
    setSelectedItem(index);
  };

  const proceedHandler = async () => {
    startAnimation();
    setConfirmed(true);
    await supabase.from('piggybank').insert([
      {
        name: 'Car Down Payment',
        desc: 'Funds for purchasing a new car',
        total: 12000,
        paid: 0,
        per_month: 200,
        wallet_id: 1,
      },
    ]);
  };

  useEffect(() => {
    const getPiggybank = async () => {
      let { data: items } = await supabase
        .from('piggybank')
        .select('name, desc, total, paid, per_month');
      setItems(items);
    };
    getPiggybank();
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();

  // After selecting one of the options
  const [select, setSelect] = useState('');
  const [sliderValue, setSliderValue] = useState(10);

  // For Assets
  const [asset, setAssets] = useState('car');
  const [amount, setAmount] = useState(80000);

  // For confirmation
  const [confirmed, setConfirmed] = useState(false);

  const handleChange = event => {
    setAmount(event.target.value);
    console.log(event.target.value);
  };

  const refAnimationInstance = useRef(null);
  const [intervalId, setIntervalId] = useState();

  const getInstance = useCallback(instance => {
    refAnimationInstance.current = instance;
  }, []);

  const nextTickAnimation = useCallback(() => {
    if (refAnimationInstance.current) {
      refAnimationInstance.current(getAnimationSettings(60, 0));
      refAnimationInstance.current(getAnimationSettings(120, 1));
    }
  }, []);

  const startAnimation = useCallback(() => {
    if (!intervalId) {
      setIntervalId(setInterval(nextTickAnimation, 16));
    }
  }, [nextTickAnimation, intervalId]);

  const stopAnimation = useCallback(() => {
    clearInterval(intervalId);
    setIntervalId(null);
    refAnimationInstance.current && refAnimationInstance.current.reset();
  }, [intervalId]);

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);

  return (
    <Layout>
      <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
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
                    onClick={setSelectedItem.bind(null, index)}
                  />
                ))}
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
            </Flex>
            {items && <ItemDetails selectedItem={items[selectedItem]} />}
          </Flex>

          <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered
            size="xl"
            scrollBehavior={'inside'}
            closeOnOverlayClick={false}
          >
            <ModalOverlay />

            {select.length > 1 && confirmed === false ? (
              <ModalContent pb="20px">
                <ModalHeader>
                  <Flex justifyContent="space-between" alignItems="center">
                    {select}
                    <Button
                      bgColor="secondaryBlue"
                      color="white"
                      variant="solid"
                      _hover={{
                        bgColor: 'secondaryBlue',
                        color: 'white',
                      }}
                      onClick={() => {
                        setSelect('');
                        setSliderValue(10);
                        setConfirmed(false);
                      }}
                    >
                      Back
                    </Button>
                  </Flex>
                </ModalHeader>
                <ModalBody>
                  <Flex gap="30px" direction="column">
                    {/* What to save */}
                    <Flex direction="column" gap="20px">
                      <Text>What are you saving for?</Text>
                      <Button
                        onClick={() => setAssets('Car')}
                        variant="solid"
                        colorScheme={asset === 'Car' ? 'blue' : 'gray'}
                      >
                        Car
                      </Button>
                      <Button
                        onClick={() => setAssets('House')}
                        variant="solid"
                        colorScheme={asset === 'House' ? 'blue' : 'gray'}
                      >
                        House
                      </Button>
                    </Flex>

                    {/* How long */}
                    <Flex direction="column">
                      <Text>How many years do you want to save this for?</Text>
                      <Slider
                        aria-label="slider-ex-6"
                        onChange={val => setSliderValue(val)}
                        max={20}
                        marginTop="40px"
                        min={1}
                      >
                        <SliderMark
                          value={sliderValue}
                          textAlign="center"
                          borderRadius="20px"
                          bg="blue.500"
                          color="white"
                          mt="-10"
                          ml="-5"
                          w="12"
                        >
                          {sliderValue}
                        </SliderMark>
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                      </Slider>
                    </Flex>

                    {/* How much */}
                    <Flex direction="column" gap="20px">
                      <Text>How much is the {asset}?</Text>
                      <InputGroup>
                        <InputLeftAddon children="RM" />
                        <Input
                          type="number"
                          placeholder="80000"
                          defaultValue={amount}
                          onChange={handleChange}
                        />
                      </InputGroup>
                    </Flex>

                    {/* Calculations */}
                    <Flex direction="column" gap="20px">
                      <Text>
                        We will help you to save up for the{' '}
                        <span
                          style={{
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: 'green',
                          }}
                        >
                          15%
                        </span>{' '}
                        of the down payment for the selected asset.
                      </Text>

                      <Flex direction="column">
                        <Text>
                          <span
                            style={{
                              fontSize: '20px',
                              fontWeight: 'bold',
                              color: 'green',
                            }}
                          >
                            RM {amount * (15 / 100)}
                          </span>{' '}
                          is the total down payment
                        </Text>
                        {/* <Text>
                          RM {amount - amount * (15 / 100)} is the remaining
                          amount to be paid
                        </Text> */}
                        <Text>
                          You have selected {sliderValue} years to achieve your
                          target, therefore, you will need to save&nbsp;
                          <span
                            style={{
                              fontSize: '20px',
                              fontWeight: 'bold',
                              color: 'green',
                            }}
                          >
                            RM{' '}
                            {(
                              (amount * (15 / 100)) /
                              (sliderValue * 12)
                            ).toFixed(2)}
                          </span>{' '}
                          every month to achieve your goal!
                        </Text>
                      </Flex>
                    </Flex>

                    {/* Links */}
                    <Flex
                      w="100%"
                      gap="20px"
                      direction="column"
                      fontWeight="bold"
                    >
                      <Text>Visit RHB Services for more informations!</Text>
                      <Flex justify="space-around">
                        <Button
                          onClick={() => {
                            window.open(
                              'https://www.rhbinsurance.com.my/',
                              '_blank'
                            );
                          }}
                          variant="solid"
                          bgColor="secondaryBlue"
                          color="white"
                          _hover={{
                            bgColor: 'secondaryBlue',
                            color: 'white',
                          }}
                        >
                          RHB Insurance
                        </Button>
                        <Button
                          onClick={() => {
                            window.open(
                              'https://www.rhbgroup.com/personal/loans/personal-financing/index.html',
                              '_blank'
                            );
                          }}
                          variant="solid"
                          bgColor="secondaryBlue"
                          color="white"
                          _hover={{
                            bgColor: 'secondaryBlue',
                            color: 'white',
                          }}
                        >
                          RHB Loan
                        </Button>
                      </Flex>
                    </Flex>

                    {/* Confirmation */}
                    <Flex direction="column" gap="20px" textAlign="center">
                      <Button onClick={proceedHandler}>Proceed</Button>
                      <Text fontWeight="bold" fontStyle="italic" color="green">
                        Upon confirmation, RM{' '}
                        {((amount * (15 / 100)) / (sliderValue * 12)).toFixed(
                          2
                        )}{' '}
                        will be automatically transferred to this piggy bank
                        account.
                      </Text>
                    </Flex>
                  </Flex>
                </ModalBody>
              </ModalContent>
            ) : select.length > 1 && confirmed ? (
              <ModalContent>
                <ModalCloseButton
                  onClick={() => {
                    setSelect('');
                    setConfirmed(false);
                    setAssets('');
                    stopAnimation();
                  }}
                />
                <ModalBody py="50px">
                  <Flex
                    direction="column"
                    width="100%"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Player
                      src={
                        'https://assets10.lottiefiles.com/packages/lf20_1oky66dx.json'
                      }
                      className="player"
                      loop
                      autoplay
                      speed={1}
                      style={{
                        width: '250px',
                        height: '180px',
                      }}
                    />
                    <Text fontSize="3xl" fontWeight="bold">
                      Piggy Bank created!
                    </Text>
                  </Flex>
                </ModalBody>
              </ModalContent>
            ) : (
              <ModalContent>
                <ModalHeader>Add New Piggy Bank</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <SimpleGrid columns={2} spacing={5}>
                    {PIGGYBANK_OPTIONS.map((option, index) => (
                      <Card
                        cursor="pointer"
                        onClick={() => setSelect(option.name)}
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
            )}
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
