import { useEffect, useState } from 'react';
import supabase from '../supabaseClient';

// NOTE: Make sure categoryIds is an array from a useState hook!
export const useTransactions = (
  walletId = undefined,
  categoryIds,
  startDate = undefined,
  endDate = undefined
) => {
  const [allTransactionsByWallet, setAllTransactionsByWallet] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // [1, 2, 3]
  const getTransactions = async (walletId, categoryIds, startDate, endDate) => {
    setIsLoading(true);
    let query = supabase.from('transactions').select(`*, categories (*)`);

    if (walletId) {
      query.eq('wallet_id', walletId);
    }

    if (categoryIds && categoryIds.length !== 0) {
      query = query.in('category_id', categoryIds);
    }
    if (startDate && endDate) {
      query = query.lte('date', endDate).gte('date', startDate);
    }
    query = query
      .order('date', { ascending: false })
      .order('created_at', { ascending: false });

    const { data: transactions } = await query;
    setTransactions(transactions);

    // get all transactions based on wallet id
    let { data: allTransactionsByWallet } = await supabase
      .from('transactions')
      .select(`*, categories (*)`)
      .eq('wallet_id', walletId)
      .order('date', { ascending: false })
      .order('created_at', { ascending: false });

    setAllTransactionsByWallet(allTransactionsByWallet);
    setIsLoading(false);
  };

  useEffect(() => {
    getTransactions(walletId, categoryIds, startDate, endDate);
  }, [walletId, categoryIds, startDate, endDate]);

  return { transactions, allTransactionsByWallet, isLoading };
};
