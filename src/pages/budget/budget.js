import React, { useState } from 'react';
import Layout from '../../components/layout';
import { Button, Flex, Spinner } from '@chakra-ui/react';

import ItemCard from './itemCard';
import ItemDetails from './itemDetails';
import { useBudgets } from '../../hooks/useBudgets';
import { useBudgetById } from '../../hooks/useBudgetById';

const Budget = () => {
  let today = new Date();
  const offset = today.getTimezoneOffset();
  today = new Date(today.getTime() - offset * 60 * 1000);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
    .toISOString()
    .split('T')[0];
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    .toISOString()
    .split('T')[0];
  const [selectedStartDate, setSelectedStartDate] = useState(firstDayOfMonth);
  const [selectedEndDate, setSelectedEndDate] = useState(lastDayOfMonth);

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
          <Button
            variant="primaryButton"
            w="auto"
            _hover={{ transform: '' }}
            float="right"
          >
            {' '}
            Add Budget
          </Button>
        </Flex>
        {budget && <ItemDetails budget={budget} />}
      </Flex>
    </Layout>
  );
};

export default Budget;
