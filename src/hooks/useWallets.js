import { useQuery } from 'react-query';
import { api } from '../api';

const getWallets = async () => {
  try {
    const response = await api.get('/wallets');
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const useWallets = () => {
  const { data, ...others } = useQuery({
    queryKey: ['wallets'],
    queryFn: () => getWallets(),
  });

  // all attributes in data
  // data (all wallets), count

  return {
    ...data,
    ...others,
  };
};
