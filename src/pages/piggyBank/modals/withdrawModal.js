import React, { useEffect, useState } from 'react';
import {
  Flex,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  Text,
  Select,
  Input,
  InputGroup,
  InputLeftAddon,
  Button,
  useToast,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatGroup,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { updateModalName } from '../../../redux/modalSlice';
import * as api from '../../../api/index';
import supabase from '../../../supabaseClient';

const WithdrawModal = props => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [withdrawAmount, setWithdrawAmount] = useState(1000);
  const [piggyBanks, setPiggyBanks] = useState();
  const [piggyId, setPiggyId] = useState();
  let options = [];
  let selectPiggyData = [];

  const [total, setTotal] = useState(10000);
  const [perMonth, setPerMonth] = useState(500);
  const [savedAmount, setSavedAmount] = useState(2000);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await api.getPiggyBanks().then(res => setPiggyBanks(res?.data));
      } catch (e) {
        console.log(e);
      }
    };

    fetchData().catch(console.error);
  }, []);

  piggyBanks?.data?.map(piggy => {
    return options.push({ id: piggy.id, name: piggy.name });
  });

  piggyBanks?.data?.map(piggy => {
    if (piggyId === piggy.id) {
      return selectPiggyData?.push({
        id: piggy.id,
        name: piggy.name,
        total: piggy.total,
        perMonth: piggy.per_month,
        savedAmount: piggy.paid,
      });
    }
  });

  useEffect(() => {
    setTotal(selectPiggyData[0]?.total);
    setPerMonth(selectPiggyData[0]?.perMonth);
    setSavedAmount(selectPiggyData[0]?.savedAmount);
  }, [selectPiggyData, piggyId]);

  // Before
  const completionDate = new Date();
  completionDate.setMonth(
    completionDate.getMonth() + Math.round((total - savedAmount) / perMonth)
  );

  // After
  const completionDateAfter = new Date();
  completionDateAfter.setMonth(
    completionDateAfter.getMonth() +
      Math.round((total - (savedAmount - withdrawAmount)) / perMonth)
  );

  const withdrawAmountHandler = event => {
    setWithdrawAmount(event.target.value);
  };

  const todayDate = new Date();
  const offset = todayDate.getTimezoneOffset();
  const [date, setDate] = useState(
    new Date(todayDate.getTime() - offset * 60 * 1000)
      .toISOString()
      .split('T')[0]
  );

  const proceedHandler = async () => {
    try {
      await api.withdrawPiggyBank(piggyId, withdrawAmount);

      await supabase
        .from('transactions')
        .insert({
          wallet_id: 1,
          date: date,
          category_id: 9,
          description: 'Withdraw from piggy bank',
          amount: withdrawAmount,
        })
        .then(res => console.log(res));

      toast({
        title: 'Withdraw success',
        description: `RM ${withdrawAmount} has been transferred to your primary account.`,
        status: 'info',
        duration: 5000,
        isClosable: true,
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

    dispatch(updateModalName(''));
    props.onClose();
  };

  return (
    <ModalContent>
      <ModalCloseButton onClick={() => {}} />
      <ModalHeader>
        <Flex justifyContent="space-between" alignItems="center">
          Withdraw
        </Flex>
      </ModalHeader>

      <ModalBody>
        <Flex direction="column" gap="20px">
          <Flex width="100%">
            <Select
              placeholder="Select Piggy Bank to withdraw from"
              onChange={e => {
                setPiggyId(parseInt(e.target.value));
                // console.log(piggyId);
              }}
            >
              {options.map(piggy => {
                return <option value={piggy.id}>{piggy.name}</option>;
              })}
            </Select>
          </Flex>
          <Flex direction="column" gap="20px">
            <Text as="b">How much do you want to withdraw?</Text>
            <InputGroup>
              <InputLeftAddon children="RM" />
              <Input
                type="number"
                placeholder="1000"
                value={withdrawAmount}
                onChange={withdrawAmountHandler}
                max={savedAmount}
                min={1}
              />
            </InputGroup>
          </Flex>
          {total ? (
            <Flex direction="column" gap="20px">
              <Text as="b">How does it affect your goal?</Text>
              <Flex direction="column">
                <StatGroup gap="100px">
                  {/* After */}
                  <Stat>
                    <StatLabel>Before Withdraw</StatLabel>
                    <StatNumber color="green">
                      RM {savedAmount} saved
                    </StatNumber>
                    <StatHelpText width="150px">
                      Expected completion by{' '}
                      {completionDate.toLocaleString('default', {
                        month: 'long',
                      })}{' '}
                      {completionDate.getFullYear()}
                    </StatHelpText>
                  </Stat>

                  {/* Before */}
                  <Stat>
                    <StatLabel>After Withdraw</StatLabel>
                    <StatNumber color="red">
                      RM {savedAmount - withdrawAmount} saved
                    </StatNumber>
                    <StatHelpText width="150px">
                      Expected completion by{' '}
                      {completionDateAfter.toLocaleString('default', {
                        month: 'long',
                      })}{' '}
                      {completionDateAfter.getFullYear()}
                    </StatHelpText>
                  </Stat>
                </StatGroup>
              </Flex>
            </Flex>
          ) : null}

          <Flex width="100%" justify="center" marginBottom="20px">
            <Button
              variant="outline"
              colorScheme="red"
              onClick={proceedHandler}
            >
              Yes, I want to withdraw the selected amount
            </Button>
          </Flex>
        </Flex>
      </ModalBody>
    </ModalContent>
  );
};

export default WithdrawModal;
