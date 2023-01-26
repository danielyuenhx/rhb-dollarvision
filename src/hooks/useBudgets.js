import { useQuery } from 'react-query';
import { api } from '../api';
import { searchParamsToString } from '../api/utils';

const getBudgets = async (startDate, endDate) => {
  let query = {};
  if (startDate) query.startDate = startDate;
  if (endDate) query.endDate = endDate;

  try {
    const response = await api.get('/budgets' + searchParamsToString(query));
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const useBudgets = (startDate = undefined, endDate = undefined) => {
  const { data, ...others } = useQuery({
    queryKey: ['budgets', startDate, endDate],
    queryFn: () => getBudgets(startDate, endDate),
  });

  // all attributes in data
  // data (all budgets -> has id, name, description, limit, totalExpense, percentage, categories (id, name, color)), count

  return {
    ...data,
    ...others,
  };
};
