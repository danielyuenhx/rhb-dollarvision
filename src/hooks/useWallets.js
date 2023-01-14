import { useEffect, useState } from 'react';
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
