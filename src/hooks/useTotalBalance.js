import { useQuery } from 'react-query';
import { api } from '../api';
import { searchParamsToString } from '../api/utils';

const getTotalBalance = async (endDate, walletId) => {
  let query = {};
  if (endDate) query.endDate = endDate;
  if (walletId) query.walletId = walletId;

  try {
    const response = await api.get(
      '/wallets/totalBalance' + searchParamsToString(query)
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const useTotalBalance = (endDate = undefined, walletId = undefined) => {
  const { data, ...others } = useQuery({
    queryKey: ['totalBalance', endDate, walletId],
    queryFn: () => getTotalBalance(endDate, walletId),
  });

  // all attributes in data
  // data (totalBalance)

  return {
    ...data,
    ...others,
  };
};
