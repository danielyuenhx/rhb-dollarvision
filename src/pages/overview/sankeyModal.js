import React from 'react';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Button,
  Text,
} from '@chakra-ui/react';
import Node from '../../components/node';
import {
  ToolTip,
  Sankey,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LabelList,
  Tooltip,
} from 'recharts';
import Link from '../../components/link';

const SankeyModal = ({
  isOpen,
  onClose,
  totalIncome,
  totalExpense,
  incomeTransactions,
  expenseTransactions,
  previousBalance,
  remainingBalance,
  period,
}) => {
  const data0 = {
    nodes: [
      { name: 'Income' },
      { name: 'Expenses' },
      { name: 'Food' },
      { name: 'Shopping' },
      { name: 'Piggy-bank' },
      { name: 'Balance' },
      { name: 'Previous balance' },
      { name: 'Total assets' },
    ],
    links: [
      { source: 0, target: 7, value: 1000.7 },
      { source: 1, target: 2, value: 300.7 },
      { source: 1, target: 3, value: 300.7 },
      { source: 7, target: 4, value: 1000 },
      { source: 7, target: 1, value: 399.3 },
      { source: 6, target: 7, value: 399.3 },
    ],
  };
  console.log(incomeTransactions);

  const sankeyData = {
    nodes: [],
    links: [],
  };

  // previous balance = 0, income = 1, total assets = 2, expenses = 3,
  // expenseTransactions=expenseLength, piggybank = expenseLength + 1, balance = expenseLength +5
  sankeyData.nodes.push({ name: 'Income' });
  sankeyData.nodes.push({ name: 'Total Assets' });
  sankeyData.nodes.push({ name: 'Expenses' });
  const offset = 3;

  // mapping income transactions to income
  incomeTransactions.map((transaction, index) => {
    sankeyData.nodes.push({ name: transaction.name });
    sankeyData.links.push({
      source: index + offset,
      target: 0,
      value: transaction.amount,
    });
  });

  const prevBalOffset = offset + incomeTransactions.length;

  // mapping previous balance to total assets
  sankeyData.nodes.push({ name: 'Previous Balance' });
  sankeyData.links.push({
    source: prevBalOffset,
    target: 1,
    value: previousBalance,
  });

  // mapping income to assets
  sankeyData.links.push({ source: 0, target: 1, value: totalIncome });

  // mapping total assets to expenses
  sankeyData.links.push({ source: 1, target: 2, value: totalExpense });

  const expenseOffset = prevBalOffset + 1;

  // mapping expense to expense transactions
  expenseTransactions.map((transaction, index) => {
    sankeyData.nodes.push({ name: transaction.name });
    sankeyData.links.push({
      source: 2,
      target: index + expenseOffset,
      value: transaction.amount,
    });
  });

  const balanceOffset = expenseOffset + expenseTransactions.length;

  // TODO: mapping total assets to piggy bank
  // sankeyData.nodes.push({ name: 'Piggy bank' });
  // sankeyData.links.push({ source: 2, target: 4, value:  });

  // mapping total assets to remaining balance
  sankeyData.nodes.push({ name: 'Balance' });
  sankeyData.links.push({
    source: 1,
    target: balanceOffset,
    value: remainingBalance,
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
      motionPreset="slideInBottom"
      size="6xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Overview of {period}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Sankey
            width={1100}
            height={500}
            data={sankeyData}
            node={<Node />}
            nodePadding={30}
            margin={{
              top: 30,
              left: 40,
              right: 120,
              bottom: 30,
            }}
            iterations={0}
            link={<Link />}
          >
            <Tooltip />
          </Sankey>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            variant="solid"
            alignSelf="self-end"
            onClick={onClose}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SankeyModal;
