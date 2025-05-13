import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';
import Cookies from 'js-cookie'; // или localStorage
import { parseISO, isWithinInterval } from 'date-fns'; // Для работы с датами

// Получаем текущий userId
const getUserId = () => Cookies.get('userId') || localStorage.getItem('userId');

const initialState = {
  items: [],
  status: 'idle',
  error: null,
  filteredItems: [], // Добавляем состояние для фильтрации по дате
};

// Загружаем только транзакции текущего пользователя
export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async () => {
    const userId = getUserId();
    const response = await axiosInstance.get('/transactions');
    // Фильтруем только по userId
    return response.data.filter(tx => tx.userId === userId);
  }
);

// Добавляем новую транзакцию с userId
export const addTransactionToServer = createAsyncThunk(
  'transactions/addTransactionToServer',
  async (newTransaction) => {
    const userId = getUserId();
    const transactionWithUser = {
      ...newTransaction,
      userId,
      id: String(Date.now()),
      date: new Date().toISOString()
    };
    const response = await axiosInstance.post('/transactions', transactionWithUser);
    return response.data;
  }
);

// Обновляем транзакцию
export const updateTransactionOnServer = createAsyncThunk(
  'transactions/updateTransactionOnServer',
  async (updatedTransaction) => {
    const response = await axiosInstance.put(`/transactions/${updatedTransaction.id}`, updatedTransaction);
    return response.data;
  }
);

// Удаляем транзакцию
export const deleteTransactionFromServer = createAsyncThunk(
  'transactions/deleteTransactionFromServer',
  async (transactionId) => {
    await axiosInstance.delete(`/transactions/${transactionId}`);
    return transactionId; // Возвращаем ID для удаления из стейта
  }
);

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      const newTransaction = {
        ...action.payload,
        userId: getUserId(),
        id: String(Date.now()),
        date: new Date().toISOString()
      };
      state.items.push(newTransaction);
      localStorage.setItem('transactions', JSON.stringify(state.items));
    },
    removeTransaction: (state, action) => {
      const filteredItems = state.items.filter(tx => tx.id !== action.payload);
      state.items = filteredItems;
      localStorage.setItem('transactions', JSON.stringify(state.items));
    },
    updateTransaction: (state, action) => {
      const updatedItems = state.items.map(tx =>
        tx.id === action.payload.id ? action.payload : tx
      );
      state.items = updatedItems;
      localStorage.setItem('transactions', JSON.stringify(state.items));
    },
    filterTransactionsByDate: (state, action) => {
      const { startDate, endDate } = action.payload;
      const filtered = state.items.filter(tx => {
        const transactionDate = parseISO(tx.date);
        return isWithinInterval(transactionDate, { start: startDate, end: endDate });
      });
      state.filteredItems = filtered;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTransactions.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.filteredItems = action.payload; // Если фильтр не применен, показываем все транзакции
        localStorage.setItem('transactions', JSON.stringify(state.items));
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addTransactionToServer.fulfilled, (state, action) => {
        state.items.push(action.payload);
        localStorage.setItem('transactions', JSON.stringify(state.items));
      })
      .addCase(updateTransactionOnServer.fulfilled, (state, action) => {
        state.items = state.items.map(tx =>
          tx.id === action.payload.id ? action.payload : tx
        );
        localStorage.setItem('transactions', JSON.stringify(state.items));
      })
      .addCase(deleteTransactionFromServer.fulfilled, (state, action) => {
        state.items = state.items.filter(tx => tx.id !== action.payload);
        localStorage.setItem('transactions', JSON.stringify(state.items));
      });
  }
});

export const { addTransaction, removeTransaction, updateTransaction, filterTransactionsByDate } = transactionsSlice.actions;
export default transactionsSlice.reducer;
