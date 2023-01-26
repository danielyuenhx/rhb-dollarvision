import React, { useState } from 'react';
import Layout from '../../components/layout';
import {
  Button,
  Flex,
  IconButton,
  Input,
  Spinner,
  useDisclosure,
  Modal,
  ModalOverlay,
} from '@chakra-ui/react';

import ItemCard from './itemCard';
import ItemDetails from './itemDetails';
import { useBudgets } from '../../hooks/useBudgets';
import { useBudgetById } from '../../hooks/useBudgetById';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import {
  firstDayOfMonth,
  lastDayOfMonth,
  setNextMonth,
  setPreviousMonth,
  today,
} from '../../helpers';
import AddModal from './modals/addModals';

const Budget = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedStartDate, setSelectedStartDate] = useState(firstDayOfMonth);
  const [selectedEndDate, setSelectedEndDate] = useState(lastDayOfMonth);
  const rightButtonDisabled =
    today.getMonth() === new Date(selectedStartDate).getMonth() &&
    today.getFullYear() === new Date(selectedStartDate).getFullYear();

  const { data: budgets, isLoading: budgetsAreLoading } = useBudgets(
    selectedStartDate,
    selectedEndDate
  );
  const defaultBudgetId = !budgetsAreLoading && budgets ? budgets[0].id : 1;
  const [selectedBudgetId, setSelectedBudgetId] = useState(defaultBudgetId);

  const { data: budget, isLoading: budgetIsLoading } = useBudgetById(
    selectedBudgetId,
    selectedStartDate,
    selectedEndDate
  );
  const isLoading = budgetsAreLoading || budgetIsLoading;

  const moveToPreviousMonth = () => {
    setPreviousMonth(
      selectedStartDate,
      setSelectedStartDate,
      setSelectedEndDate
    );
  };

  const moveToNextMonth = () => {
    setNextMonth(selectedStartDate, setSelectedStartDate, setSelectedEndDate);
  };

  if (isLoading) {
    <Layout>
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
    </Layout>;
  }

  return (
    <Layout>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size="xl"
        scrollBehavior={'inside'}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <AddModal onClose={onClose} />
      </Modal>
      <Flex gap="20px" direction="column">
        <Flex gap="20px" direction="column" alignItems="flex-end">
          <Flex
            gap="25px"
            direction="row"
            w="50%"
            justifyContent="flex-end"
            alignItems="center"
            mt={4}
          >
            <Flex gap="10px" w="100%">
              <IconButton
                icon={<FaChevronLeft />}
                onClick={moveToPreviousMonth}
              />
              <Input
                type="text"
                value={`${new Date(selectedStartDate).toLocaleString(
                  'default',
                  {
                    month: 'long',
                  }
                )}, ${new Date(selectedStartDate).getFullYear()}`}
                readOnly
              />
              <IconButton
                icon={<FaChevronRight />}
                onClick={moveToNextMonth}
                disabled={rightButtonDisabled}
              />
            </Flex>
            <Button
              onClick={onOpen}
              colorScheme="blue"
              variant="solid"
              alignSelf="self-end"
            >
              Add Budget
            </Button>
          </Flex>
        </Flex>
        <Flex gap="30px" direction="row">
          <Flex gap="25px" direction="column" w="50%">
            {budgets &&
              budgets.map((budget, index) => (
                <ItemCard
                  key={budget.id}
                  index={index}
                  title={budget.name}
                  desc={budget.description}
                  percentage={budget.percentage}
                  onClick={setSelectedBudgetId.bind(null, budget.id)}
                />
              ))}
          </Flex>
          {budget && <ItemDetails budget={budget} />}
        </Flex>
      </Flex>
    </Layout>
  );
};

export default Budget;
