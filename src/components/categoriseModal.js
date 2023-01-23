import React from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Select,
  Tag,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { categoriseTransaction } from '../redux/transactionSlice';

const parseAmount = (amount, categoryType) => {
  if (categoryType === 'expense') {
    return `-${amount.toFixed(2)}`;
  } else {
    return `+${amount.toFixed(2)}`;
  }
};

const CategoriseModal = ({ uncategorisedTransactions, categories }) => {
  const {
    isOpen: isOpenUncategorised,
    onOpen: onOpenUncategorised,
    onClose: onCloseUncategorised,
  } = useDisclosure();

  const dispatch = useDispatch();

  const handleSave = e => {
    e.preventDefault();
    const select = [...e.target.elements].filter(
      element => element.nodeName === 'SELECT'
    );
    select.map(item => {
      dispatch(categoriseTransaction(item.id, item.value));
    });
    onCloseUncategorised();
  };

  return (
    <>
      {uncategorisedTransactions && (
        <Modal
          isOpen={isOpenUncategorised}
          onClose={onCloseUncategorised}
          scrollBehavior="inside"
          motionPreset="slideInBottom"
          size="5xl"
        >
          <ModalOverlay />
          <ModalContent>
            <form onSubmit={handleSave}>
              <ModalHeader>Uncategorised Transactions</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr bg="gray.200">
                        <Th borderRadius="0.375rem 0 0 0">Date</Th>
                        <Th>Wallet</Th>
                        <Th>Description</Th>
                        <Th isNumeric>Amount</Th>
                        <Th borderRadius="0 0.375rem 0 0">Category</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {uncategorisedTransactions &&
                        uncategorisedTransactions.map(transaction => {
                          return (
                            <>
                              <Tr>
                                <Td>
                                  {transaction.date
                                    .split('-')
                                    .reverse()
                                    .join('/')}
                                </Td>
                                <Td>{transaction.wallets.name}</Td>
                                <Td>{transaction.description}</Td>
                                <Td isNumeric>
                                  {parseAmount(
                                    transaction.amount,
                                    transaction.categories.type
                                  )}
                                </Td>
                                <Td>
                                  <Select
                                    id={transaction.id ? transaction.id : ''}
                                  >
                                    {transaction.categories.type === 'expense'
                                      ? categories.expenseCategories.map(
                                          category => (
                                            <option
                                              value={
                                                categories.data.find(
                                                  obj =>
                                                    obj.name === category.name
                                                ).id
                                              }
                                            >
                                              {category.name}
                                            </option>
                                          )
                                        )
                                      : categories.incomeCategories.map(
                                          category => (
                                            <option
                                              value={
                                                categories.data.find(
                                                  obj =>
                                                    obj.name === category.name
                                                ).id
                                              }
                                            >
                                              {category.name}
                                            </option>
                                          )
                                        )}
                                  </Select>
                                </Td>
                              </Tr>
                            </>
                          );
                        })}
                    </Tbody>
                  </Table>
                </TableContainer>
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={onCloseUncategorised}
                >
                  Close without Saving
                </Button>
                <Button
                  type="submit"
                  colorScheme="blue"
                  variant="solid"
                  alignSelf="self-end"
                >
                  Save
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      )}
      {uncategorisedTransactions.length !== 0 && (
        <Alert status="info" cursor="pointer" onClick={onOpenUncategorised}>
          <AlertIcon />
          <AlertTitle>{`You have ${
            uncategorisedTransactions.length
          } uncategorised transaction${
            uncategorisedTransactions.length !== 1 ? 's' : ''
          }!`}</AlertTitle>
          <AlertDescription>Click here to categorise.</AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default CategoriseModal;
