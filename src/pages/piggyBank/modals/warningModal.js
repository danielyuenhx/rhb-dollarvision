import React, { useState } from 'react';
import {
  Button,
  Flex,
  ModalContent,
  ModalBody,
  ModalHeader,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { updateModalName } from '../../../redux/modalSlice';
import supabase from '../../../supabaseClient';
import * as api from '../../../api/index';

const WarningModal = props => {
  const piggyBank = useSelector(state => state.modal.piggyBankData);
  const dispatch = useDispatch();
  const toast = useToast();

  const todayDate = new Date();
  const offset = todayDate.getTimezoneOffset();
  const [date, setDate] = useState(
    new Date(todayDate.getTime() - offset * 60 * 1000)
      .toISOString()
      .split('T')[0]
  );

  const BackHandler = () => {
    dispatch(updateModalName('Selection'));
  };

  const proceedHandler = async () => {
    try {
      await api.createPiggyBank(
        piggyBank.name,
        piggyBank.desc,
        piggyBank.walletId,
        piggyBank.downPaymentAmount,
        piggyBank.installment,
        piggyBank.initialDesposit
      );

      await supabase.from('transactions').insert({
        wallet_id: 1,
        date: date,
        category_id: 13,
        description: 'Deposit to piggy bank',
        amount: piggyBank.initialDesposit,
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
    props.refetchPiggyBanks();
    props.startAnimation();
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
              recommended amount, are you sure you want to proceed? You will
              need to be very strict with your budgeting to sustain in a long
              term
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
