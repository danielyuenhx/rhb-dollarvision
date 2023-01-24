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
      return action.payload;
    },
    updateTransaction: (state, action) => {
      return {
        ...state,
        data: [...state.data].map(item => {
          if (item.id === action.payload.data[0].id) {
            return action.payload.data[0];
          } else {
            return item;
          }
        }),
        uncategorizedTransactions: [...state.uncategorizedTransactions].filter(
          item => item.id !== action.payload.data[0].id
        ),
      };
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

export const categoriseTransaction =
  (transactionId, categoryId) => async dispatch => {
    try {
      const { data } = await api.categoriseTransaction(
        transactionId,
        categoryId
      );

      dispatch(transactionSlice.actions.updateTransaction(data));
    } catch (e) {
      console.log(e);
    }
  };

export const { transactionIncrement, decrement, incrementByAmount } =
  transactionSlice.actions;

export default transactionSlice.reducer;
