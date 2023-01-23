import { createSlice } from '@reduxjs/toolkit';
import * as api from '../api';

const initialState = {
  transaction: {},
};

export const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    getTransactions: (state, action) => {
      return action.payload;
    },
    updateTransactions: (state, action) => {
      console.log(action.payload);
      return action.payload;
    },
  },
});

// use this for getting data from backend
// try and catch
export const getTransactions = () => async dispatch => {
  try {
    const { data } = await api.getTransactions();

    dispatch(transactionSlice.actions.getTransactions(data));
  } catch (e) {
    console.log(e);
  }
};
export const createTransaction =
  (walletId, date, categoryId, description, amount) => async dispatch => {
    try {
      const { data } = await api.getTransactions(
        walletId,
        date,
        categoryId,
        description,
        amount
      );

      dispatch(transactionSlice.actions.updateTransactions(data));
    } catch (e) {
      console.log(e);
    }
  };

export const { transactionIncrement, decrement, incrementByAmount } =
  transactionSlice.actions;

export default transactionSlice.reducer;
