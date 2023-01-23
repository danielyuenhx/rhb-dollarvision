import { useQuery } from 'react-query';
import { api } from '../api';
import { searchParamsToString } from '../api/utils';

const getBudgetById = async (id, startDate, endDate) => {
  let query = {};
  if (startDate) query.startDate = startDate;
  if (endDate) query.endDate = endDate;

  try {
    const response = await api.get(
      `/budgets/${id}` + searchParamsToString(query)
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const useBudgetById = (
  id,
  startDate = undefined,
  endDate = undefined
) => {
  const { data, ...others } = useQuery({
    queryKey: ['budgetById', id, startDate, endDate],
    queryFn: () => getBudgetById(id, startDate, endDate),
  });

  // all attributes in data
  // data (only one budget object with attributes of id, name, description, limit, totalExpense, percentage, categories (id, name, color), transactions (all related transactions with its wallet and category details))

  return {
    ...data,
    ...others,
  };
};
