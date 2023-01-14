import { useEffect, useState } from 'react';
import supabase from '../supabaseClient';

export const useBudgets = () => {
  const [budget, setBudget] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const getBudgets = async () => {
      let { data: items } = await supabase
        .from('budgets')
        .select('id, name, desc, total, budgets_categories ( category_id )');
      setBudget(items);
    };
    getBudgets();
    setIsLoading(false);
  }, []);

  return { budget, isLoading };
};
