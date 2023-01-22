import axios from 'axios';

const api = axios.create({ baseURL: process.env.REACT_APP_API_URL });

// callback functions that make requests
export const getCategories = () => api.get('/categories');
export const createCategory = (name, type, color) =>
  api.post('/categories', { name, type, color });
