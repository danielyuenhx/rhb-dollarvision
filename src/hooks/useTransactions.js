import { api } from '../api';
import { useQuery } from 'react-query';
import { searchParamsToString } from '../api/utils';

const getTransactions = async (walletId, categoryIds, startDate, endDate) => {
  let query = {};
  if (walletId) query.walletId = walletId;
  if (categoryIds) query.categoryIds = categoryIds;
  if (startDate) query.startDate = startDate;
  if (endDate) query.endDate = endDate;

  try {
    const response = await api.get(
      '/transactions' + searchParamsToString(query)
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const useTransactions = ({
  walletId = undefined,
  categoryIds = undefined,
  startDate = undefined,
  endDate = undefined,
} = {}) => {
  const { data, ...others } = useQuery({
    queryKey: ['transactions', walletId, categoryIds, startDate, endDate],
    queryFn: () => getTransactions(walletId, categoryIds, startDate, endDate),
  });

  // all attributes in data
  // data (all transactions), count, totalIncome, totalExpense, nettChange, incomeTransactionsGroupedByCategoryAndSorted, expenseTransactionsGroupedByCategoryAndSorted, uncategorizedTransactions

  return {
    ...data,
    ...others,
  };
};
