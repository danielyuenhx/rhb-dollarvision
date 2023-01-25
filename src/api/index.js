import axios from 'axios';

export const api = axios.create({ baseURL: process.env.REACT_APP_API_URL });

// callback functions that make requests
export const getCategories = () => api.get('/categories');
export const createCategory = (name, type, color) =>
  api.post('/categories', { name, type, color });

export const getTransactions = (
  walletId,
  date,
  categoryId,
  description,
  amount
) =>
  api.get('/transactions', { walletId, date, categoryId, description, amount });
export const categoriseTransaction = (transactionId, categoryId) =>
  api.put(`/transactions/${transactionId}`, { categoryId });

export const createWallet = (name, initialBalance) =>
  api.post(`/wallets`, { name, initialBalance });
export const favouriteWallet = (walletId, isFav) =>
  api.put(`/wallets/${walletId}`, { isFav });
