import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout';
import { Button, Flex, Box, Spinner } from '@chakra-ui/react';

import ItemCard from './itemCard';
import ItemDetails from './itemDetails';
import { useOldBudgets } from '../../hooks/useOldBudgets';
import { useOldCategories } from '../../hooks/useCategories';
import { useTransactions } from '../../hooks/useTransactions';
import { useCalculations } from '../../hooks/useCalculations';
import _ from 'lodash';

const Budget = () => {
  const [selectedItem, setSelectedItem] = useState(0);
  const [fetchedItems, setFetchedItems] = useState();
  const [selectedCategories, setSelectedCategories] = useState([]);

  const { budget, isLoading: budgetsIsLoading } = useOldBudgets();

  const { transactions, allTransactions } = useTransactions(
    undefined,
    selectedCategories
  );

  const { totalExpense } = useCalculations(0, transactions);

  const { categories } = useOldCategories(selectedCategories);

  useEffect(() => {
    if (budget && !budgetsIsLoading) {
      const categories = budget[selectedItem].budgets_categories.map(
        object => object.category_id
      );
      setFetchedItems(budget);
      setSelectedCategories(categories);
    }
  }, [budget, budgetsIsLoading, selectedItem]);

  const parseAmount = (amount, categoryType) => {
    if (categoryType === 'expense') {
      return `-${amount.toFixed(2)}`;
    } else {
      return `+${amount.toFixed(2)}`;
    }
  };

  const transactionsGroupedByDate = _.groupBy(
    transactions,
    transaction => transaction.date
  );

  const dateKeysSorted = Object.keys(transactionsGroupedByDate).sort(function (
    a,
    b
  ) {
    return b - a;
  });

  return (
    <Layout>
      {totalExpense && categories ? (
        <Flex gap="30px" direction="row">
          <Flex gap="25px" direction="column" w="50%">
            {fetchedItems &&
              fetchedItems.map((item, index) => (
                <ItemCard
                  key={index}
                  index={index}
                  title={item.name}
                  desc={item.desc}
                  total={item.total}
                  onClick={setSelectedItem.bind(null, index)}
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
          {fetchedItems && (
            <ItemDetails
              selectedItem={fetchedItems[selectedItem]}
              spent={totalExpense}
              dateKeysSorted={dateKeysSorted}
              transactionsGroupedByDate={transactionsGroupedByDate}
              parseAmount={parseAmount}
              categories={categories}
            />
          )}
        </Flex>
      ) : (
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
      )}
    </Layout>
  );
};

export default Budget;
