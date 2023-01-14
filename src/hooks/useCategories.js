import { useEffect, useState } from 'react';
import supabase from '../supabaseClient';

export const useCategories = categoryIds => {
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
