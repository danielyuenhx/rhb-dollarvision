import { useQuery } from 'react-query';
import { api } from '../api';

const getPiggyBankById = async id => {
  try {
    const response = await api.get(`/piggy_banks/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const usePiggyBankById = id => {
  const { data, ...others } = useQuery({
    queryKey: ['piggyBankById', id],
    queryFn: () => getPiggyBankById(id),
  });

  // all attributes in data
  // data (only one budget object with attributes of id ...

  return {
    ...data,
    ...others,
  };
};
