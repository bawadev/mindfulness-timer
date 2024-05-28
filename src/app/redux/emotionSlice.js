// src/redux/emotionSlice.js
import { createSlice } from '@reduxjs/toolkit';

const emotionSlice = createSlice({
  name: 'emotions',
  initialState: [],
  reducers: {
    addEmotionEntry: (state, action) => {
      state.push(action.payload);
      localStorage.setItem('emotionEntries', JSON.stringify(state));
    },
    loadEmotionsFromStorage: (state) => {
      const savedEntries = JSON.parse(localStorage.getItem('emotionEntries')) || [];
      return savedEntries;
    },
  },
});

export const { addEmotionEntry, loadEmotionsFromStorage } = emotionSlice.actions;

export default emotionSlice.reducer;
