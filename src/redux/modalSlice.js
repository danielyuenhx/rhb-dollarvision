import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentModalName: '',
  modalState: false,
  piggyBankData: {},
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
    updatePiggyBankData: (state, action) => {
      state.piggyBankData = action.payload;
    },
  },
});

export const { updateModalName, updateModalState, updatePiggyBankData } =
  modalSlice.actions;

export default modalSlice.reducer;
