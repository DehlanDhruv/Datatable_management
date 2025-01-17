import { configureStore } from '@reduxjs/toolkit';
import gridReducer from './gridSlice.js';
export const store = configureStore({
  reducer: {
    grid: gridReducer,
  },
});