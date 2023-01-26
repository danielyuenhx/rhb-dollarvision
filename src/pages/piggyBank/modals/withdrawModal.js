import React, { useState } from 'react';
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

const WithdrawModal = props => {
  const piggyBankList = ['Retirement', 'Car', 'Education'];
  const [withdrawAmount, setWithdrawAmount] = useState(1000);

  const dispatch = useDispatch();
  const toast = useToast();

  let total = 50000;
  let perMonth = 300;
  let savedAmount = 5000;

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

  // if withdraw x amount
  // savedAmount - withdrawAmount
  // total / installment to get the expected

  const withdrawAmountHandler = event => {
    setWithdrawAmount(event.target.value);
  };

  const proceedHandler = () => {
    dispatch(updateModalName(''));
    props.onClose();
    toast({
      title: 'Withdraw success',
      description: `RM ${withdrawAmount} has been transferred to your primary account.`,
      status: 'info',
      duration: 5000,
      isClosable: true,
    });
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
            <Select placeholder="Select piggy bank to withdraw from">
              {piggyBankList.map(piggy => {
                return <option value={piggy}>{piggy}</option>;
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
          <Flex direction="column" gap="20px">
            <Text as="b">How does it affect your goal?</Text>
            <Flex direction="column">
              <StatGroup gap="100px">
                {/* After */}
                <Stat>
                  <StatLabel>Before Withdraw</StatLabel>
                  <StatNumber color="green">RM {savedAmount} saved</StatNumber>
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
