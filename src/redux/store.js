import { configureStore } from '@reduxjs/toolkit';
import walletReducer from './walletSlice';
import transactionReducer from './transactionSlice';
import modalReducer from './modalSlice';

export const store = configureStore({
  reducer: {
    wallet: walletReducer,
    transaction: transactionReducer,
    modal: modalReducer,
  },
});
