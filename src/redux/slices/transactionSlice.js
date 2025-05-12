// features/transactions/transactionsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async () => {
    const response = await axiosInstance.get('/transactions');
    return response.data;
  }
);

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    items: [],
    status: 'idle', // 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTransactions.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default transactionsSlice.reducer;
