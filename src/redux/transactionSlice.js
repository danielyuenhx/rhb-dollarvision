import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transaction: 100,
};

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    transactionIncrement: state => {
      state.transaction += 1;
    },
    decrement: state => {
      state.transaction -= 1;
    },
    incrementByAmount: (state, action) => {
      state.transaction += action.payload;
    },
  },
});

export const { transactionIncrement, decrement, incrementByAmount } =
  transactionSlice.actions;

export default transactionSlice.reducer;
