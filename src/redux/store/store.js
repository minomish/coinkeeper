// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from '../slices/transactionSlice';

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
  },
});
