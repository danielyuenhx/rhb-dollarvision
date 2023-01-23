import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { api } from '../api';
import supabase from '../supabaseClient';

export const useWallets = () => {
  const [wallets, setWallets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const getWallets = async () => {
      let { data: wallets } = await supabase.from('wallets').select();
      setWallets(wallets);
      setIsLoading(false);
    };
    getWallets();
  }, []);

  return { wallets, isLoading };
};

const getWallets = async () => {
  try {
    const response = await api.get('/wallets');
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const useCategories = () => {
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
