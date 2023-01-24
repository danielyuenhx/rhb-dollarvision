import { configureStore } from '@reduxjs/toolkit';
import walletReducer from './walletSlice';
import transactionReducer from './transactionSlice';
import modalReducer from './modalSlice';
import categoryReducer from './categorySlice';

export const store = configureStore({
  reducer: {
    wallet: walletReducer,
    transaction: transactionReducer,
    category: categoryReducer,
    modal: modalReducer,
  },
});
