import { useEffect, useState } from 'react';
import supabase from '../supabaseClient';
import { api } from '../api';
import { useQuery } from 'react-query';

export const useOldCategories = categoryIds => {
  const [categories, setCategories] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const getCategories = async () => {
      let { data: items } = await supabase
        .from('categories')
        .select('*')
        .in('id', categoryIds);
      setCategories(items);
    };
    getCategories();
    setIsLoading(false);
  }, []);

  return { categories, isLoading };
};

const getCategories = async () => {
  try {
    const response = await api.get('/categories');
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const useCategories = () => {
  const { data, ...others } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
  });

  // all attributes in data
  // data (all categories), count, incomeCategories, expenseCategories

  return {
    ...data,
    ...others,
  };
};
