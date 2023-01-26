import React, { useState } from 'react';
import {
  Button,
  Flex,
  ModalContent,
  ModalBody,
  ModalHeader,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Input,
  InputLeftAddon,
  InputGroup,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { updateModalName } from '../../../redux/modalSlice';

const CustomModal = ({ startAnimation }) => {
  const [sliderValue, setSliderValue] = useState(10);
  const [amount, setAmount] = useState(80000);
  const [customItem, setCustomItem] = useState('iPhone 14');
  const [initialDesposit, setInitialDeposit] = useState(3000);
  // const current = useSelector(state => state.modal.currentModalName);
  const dispatch = useDispatch();

  let recommended = 1000;

  const handleAmountChange = event => {
    setAmount(event.target.value);
  };

  const handleItemChange = event => {
    setCustomItem(event.target.value);
  };

  const BackHandler = () => {
    setSliderValue(10);
    dispatch(updateModalName('Selection'));
  };

  const proceedHandler = async () => {
    startAnimation();
    dispatch(updateModalName('Completed'));
  };

  const handleDepositChange = event => {
    setInitialDeposit(event.target.value);
  };

  return (
    <ModalContent pb="20px">
      <ModalHeader>
        <Flex justifyContent="space-between" alignItems="center">
          Custom Fund
          <Button
            bgColor="secondaryBlue"
            color="white"
            variant="solid"
            _hover={{
              bgColor: 'secondaryBlue',
              color: 'white',
            }}
            onClick={BackHandler}
          >
            Back
          </Button>
        </Flex>
      </ModalHeader>
      <ModalBody>
        <Flex gap="30px" direction="column">
          {/* What to save */}
          <Flex direction="column" gap="20px">
            <Text as="b">What do you want to save for?</Text>
            <InputGroup>
              <Input
                type="string"
                placeholder="iPhone 14"
                defaultValue={customItem}
                onChange={handleItemChange}
              />
            </InputGroup>
          </Flex>
          {/* How long */}

          {/* How much */}
          <Flex direction="column" gap="20px">
            <Text as="b">How much?</Text>
            <InputGroup>
              <InputLeftAddon children="RM" />
              <Input
                type="number"
                placeholder="80000"
                defaultValue={amount}
                onChange={handleAmountChange}
              />
            </InputGroup>
          </Flex>

          {/* Initial deposit */}
          <Flex direction="column" gap="20px" justifyContent="space-between">
            <Text as="b">Initial deposit?</Text>
            <InputGroup>
              <InputLeftAddon children="RM" />
              <Input
                type="number"
                placeholder="5000"
                defaultValue={initialDesposit}
                onChange={handleDepositChange}
              />
            </InputGroup>
          </Flex>

          <Flex direction="column">
            <Text as="b">How many years do you want to save this for?</Text>
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
                w="10"
              >
                {sliderValue}
              </SliderMark>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Flex>

          <Flex direction="column">
            <Text as="b" fontSize="15px">
              Important Tips!
            </Text>
            <Text>
              Based on the balance on your account, it is recommended to not
              save more than{' '}
              <span
                style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                }}
              >
                RM {recommended}
              </span>{' '}
              for better sustainability.
            </Text>
          </Flex>
          {/* Calculations */}
          <Flex direction="column" gap="20px">
            <Flex direction="column">
              <Text>
                You have selected {sliderValue} years to achieve your target,
                therefore, you will need to save&nbsp;
                <span
                  style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: 'green',
                  }}
                >
                  RM {((amount * (15 / 100)) / (sliderValue * 12)).toFixed(2)}
                </span>{' '}
                every month to achieve your goal!
              </Text>
            </Flex>
          </Flex>

          {/* Confirmation */}
          <Flex direction="column" gap="20px" textAlign="center">
            <Button onClick={proceedHandler}>Proceed</Button>
            <Text fontWeight="bold" fontStyle="italic" color="green">
              Upon confirmation, RM{' '}
              {((amount * (15 / 100)) / (sliderValue * 12)).toFixed(2)} will be
              automatically transferred to this piggy bank account at the end of
              every month.
            </Text>
          </Flex>
        </Flex>
      </ModalBody>
    </ModalContent>
  );
};

export default CustomModal;
