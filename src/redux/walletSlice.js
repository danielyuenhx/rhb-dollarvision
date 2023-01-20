import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// use this for getting data from backend
// try and catch
export const incrementAsync = amount => dispatch => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 2000);
};

export const { increment, decrement, incrementByAmount } = walletSlice.actions;

export default walletSlice.reducer;
