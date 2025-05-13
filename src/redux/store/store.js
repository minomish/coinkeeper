// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from '../slices/transactionSlice';
import categoryReducer from '../slices/categorySlice';
import authReducer  from '../slices/authSlice';

export const store = configureStore({
  reducer: {
    user: authReducer,
    transactions: transactionsReducer,
    categories: categoryReducer,
  },
});
