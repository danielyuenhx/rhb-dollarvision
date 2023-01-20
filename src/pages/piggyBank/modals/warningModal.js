import React, { Fragment, useState } from 'react';
import {
  Button,
  Flex,
  ModalContent,
  ModalBody,
  ModalHeader,
  Text,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { updateModalName } from '../../../redux/modalSlice';

const WarningModal = () => {
  const dispatch = useDispatch();

  const BackHandler = () => {
    dispatch(updateModalName('Selection'));
  };

  const proceedHandler = async () => {
    dispatch(updateModalName('Completed'));
  };

  return (
    <ModalContent pb="20px">
      <ModalHeader>
        <Flex justifyContent="space-between" alignItems="center">
          IMPORTANT
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
            <Text textAlign="justify">
            The installment plan that you have selected is more than the
            recommended amount, are you sure you want to proceed? You will need
            to be very strict with your budgeting to sustain in a long term
            </Text>
          </Flex>
          {/* Confirmation */}
          <Flex direction="column" gap="20px" textAlign="center">
            <Button onClick={proceedHandler}>
              Yes, I acknowledge and want to proceed!
            </Button>
          </Flex>
        </Flex>
      </ModalBody>
    </ModalContent>
  );
};

export default WarningModal;
