import { useEffect, useState } from 'react';
import supabase from '../supabaseClient';
import _ from 'lodash';

export const useAllTransactions = () => {
  const [allTransactions, setAllTransactions] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const getTransactions = async () => {
    setIsLoading(true);

    // get all transactions based on wallet id
    let { data: allTransactions } = await supabase
      .from('transactions')
      .select(`*, categories (*), wallets (*)`)
      .order('date', { ascending: false })
      .order('created_at', { ascending: false });

    const transGroupedByWallets = _.groupBy(allTransactions, 'wallet_id');
    const totalBalance = Object.keys(transGroupedByWallets).reduce(
      (acc, walletId) => {
        const transactions = transGroupedByWallets[walletId];
        const balance = transactions[0].wallets.initial_balance
        acc += balance
        return acc
      },
      0
    )

    setTotalBalance(totalBalance);
    setAllTransactions(allTransactions);
    setIsLoading(false);
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return { allTransactions, totalBalance, isLoading };
};
