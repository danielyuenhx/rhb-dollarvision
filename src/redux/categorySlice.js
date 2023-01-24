import { createSlice } from '@reduxjs/toolkit';
import * as api from '../api';

const initialState = {
  categories: {},
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    getCategories: (state, action) => {
      return action.payload;
    },
    createCategory: (state, action) => {
      if (action.payload.type === 'income') {
        return {
          ...state,
          data: [...state.data, action.payload.data[0]],
          incomeCategories: [...state.incomeCategories, action.payload.data[0]],
        };
      } else {
        return {
          ...state,
          data: [...state.data, action.payload.data[0]],
          expenseCategories: [...state.expenseCategories, action.payload.data[0]],
        };
      }
    },
  },
});

// use this for getting data from backend
// try and catch
export const getCategories = () => async dispatch => {
  try {
    const { data } = await api.getCategories();

    dispatch(categorySlice.actions.getCategories(data));
  } catch (e) {
    console.log(e);
  }
};

export const createCategory = (name, type, color) => async dispatch => {
  try {
    const { data } = await api.createCategory(name, type, color);

    dispatch(categorySlice.actions.createCategory(data));
  } catch (e) {
    console.log(e);
  }
};

export const { increment, decrement, incrementByAmount } =
  categorySlice.actions;

export default categorySlice.reducer;
