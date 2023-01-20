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
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { updateModalName } from '../../../redux/modalSlice';

const WithdrawModal = props => {
  const piggyBankList = ['Retirement', 'Car', 'Education'];
  const [widthdrawAmount, setWithdrawAmount] = useState(1000);
  const savedAmount = 1000;
  const dispatch = useDispatch();
  const toast = useToast();

  const withdrawAmountHandler = event => {
    setWithdrawAmount(event.target.value);
  };

  const proceedHandler = () => {
    dispatch(updateModalName(''));
    props.onClose();
    toast({
      title: 'Withdraw success',
      description: `RM ${widthdrawAmount} has been transferred to your primary account.`,
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
                value={widthdrawAmount}
                onChange={withdrawAmountHandler}
                max={savedAmount}
                min={1}
              />
            </InputGroup>
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
