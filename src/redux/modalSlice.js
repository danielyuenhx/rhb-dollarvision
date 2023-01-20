import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentModalName: '',
};

export const modalSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    updateModalName: (state, action) => {
      state.currentModalName = action.payload;
    },
    updateModalState: (state, action) => {
      state.modalState = action.payload;
    },
  },
});

export const { updateModalName, updateModalState } = modalSlice.actions;

export default modalSlice.reducer;
