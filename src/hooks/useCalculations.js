import { useEffect, useState } from "react";

export const useCalculations = (initialBalance, transactions) => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [nettChange, setNettChange] = useState(0);
  const [totalBalance, setTotalBalance] = useState(initialBalance);

  useEffect(() => {
    let income = 0;
    let expense = 0;
    let nett = 0;

    transactions?.forEach((transaction) => {
      if (transaction.categories.type === "income") {
        income += transaction.amount;
      } else {
        expense += transaction.amount;
      }
    });

    nett = income - expense;
    
    setTotalIncome(income);
    setTotalExpense(expense);
    setNettChange(nett);
    setTotalBalance(initialBalance + nett);
  }, [initialBalance, transactions]);

  return {
    totalBalance,
    totalIncome,
    totalExpense,
    nettChange,
  };
}