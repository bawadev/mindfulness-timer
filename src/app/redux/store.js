// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import emotionReducer from './emotionSlice';

export const store = configureStore({
  reducer: {
    emotions: emotionReducer,
  },
});
