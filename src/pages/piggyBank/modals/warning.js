import React, { Fragment, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { updateModalName } from '../../../redux/modalSlice';

const WarningModal = () => {
  const [sliderValue, setSliderValue] = useState(10);
  const [amount, setAmount] = useState(10000);
  const current = useSelector(state => state.modal.currentModalName);
  const dispatch = useDispatch();

  let balance = 10000;
  let recommended = balance * (10 / 100);
  let piggyBankActive = 5;

  const handleChange = event => {
    setAmount(event.target.value);
  };

  const BackHandler = () => {
    setSliderValue(10);
    dispatch(updateModalName('Selection'));
  };

  const proceedHandler = async () => {
    dispatch(updateModalName('Completed'));
  };

  return (
    <ModalContent pb="20px">
      <ModalHeader>
        <Flex justifyContent="space-between" alignItems="center">
          Before you proceed!
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

          {/* Calculations */}
          <Flex direction="column" gap="20px">
            <Flex direction="column" variants="">
              <Text as="b" fontSize="15px">
                Important Tips!
              </Text>
              <Text>
                Based on the balance on your account, it is recommended to not
                save more than RM {recommended} for better sustainability.
              </Text>
            </Flex>

            <Flex direction="column">
              <Text as="b" fontSize="15px">
                Summary
              </Text>
              <Text>
                You have selected {sliderValue} years to achieve your target,
                therefore, you will need to save&nbsp;
                <span
                  style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color:
                      recommended < (amount / (sliderValue * 12)).toFixed(2)
                        ? 'red'
                        : 'green',
                  }}
                >
                  RM {(amount / (sliderValue * 12)).toFixed(2)}
                </span>{' '}
                every month to achieve your goal!
              </Text>
            </Flex>
          </Flex>
          {/* Confirmation */}
          <Flex direction="column" gap="20px" textAlign="center">
            <Button onClick={proceedHandler}>Proceed</Button>
            <Text
              fontWeight="bold"
              fontStyle="italic"
              color={
                recommended < (amount / (sliderValue * 12)).toFixed(2)
                  ? 'red'
                  : 'green'
              }
            >
              Upon confirmation, RM {(amount / (sliderValue * 12)).toFixed(2)}{' '}
              will be automatically transferred to this piggy bank account at
              the end of every month.
            </Text>
          </Flex>
        </Flex>
      </ModalBody>
    </ModalContent>
  );
};

export default WarningModal;
