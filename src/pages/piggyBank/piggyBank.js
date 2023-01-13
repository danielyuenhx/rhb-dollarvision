import React, { useState } from 'react';
import Layout from '../../components/layout';
import { Flex } from '@chakra-ui/react';

import ItemDetails from './itemDetails';
import ItemCard from './itemCard';

const PiggyBank = () => {
  const items = [
    {
      title: 'House',
      total: 100000,
      paid: 20000,
      perMonth: 5000,
    },
    {
      title: 'Car',
      total: 75000,
      paid: 30000,
      perMonth: 2000,
    },
    {
      title: 'PTPTN',
      total: 50000,
      paid: 5000,
      perMonth: 1000,
    },
  ];

  const [selectedItem, setSelectedItem] = useState(0);

  const onClickHandler = (index) => {
    setSelectedItem(index);
  }

  return (
    <Layout>
      <Flex gap="30px" direction="row">
        <Flex gap="25px" direction="column" w="50%">
          {items.map((item, index) => (
            <ItemCard
              key={index}
              index={index}
              title={item.title}
              total={item.total}
              paid={item.paid}
              onClick={onClickHandler}
            />
          ))}
        </Flex>
        <ItemDetails selectedItem={items[selectedItem]} />
      </Flex>
    </Layout>
  );
};

export default PiggyBank;