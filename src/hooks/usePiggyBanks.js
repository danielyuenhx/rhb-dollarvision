import { useQuery } from 'react-query';
import { api } from '../api';

const getPiggyBanks = async () => {
  try {
    const response = await api.get('/piggy_banks');
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const usePiggyBanks = () => {
  const { data, ...others } = useQuery({
    queryKey: ['piggyBanks'],
    queryFn: () => getPiggyBanks(),
  });

  // all attributes in data
  // data (all budgets -> has id, name, description, limit, totalExpense, percentage, categories (id, name, color)), count

  return {
    ...data,
    ...others,
  };
};
