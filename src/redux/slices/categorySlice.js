// В slices/categorySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await axiosInstance.get('categories');
  return response.data;
});

export const addCategory = createAsyncThunk('categories/add', async (newCategory) => {
  const response = await axiosInstance.post('categories', newCategory);
  return response.data;
});

export const deleteCategory = createAsyncThunk('categories/delete', async (categoryId) => {
  await axiosInstance.delete(`categories/${categoryId}`);
  return categoryId;
});

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    items: [],
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.items = state.items.filter(category => category.id !== action.payload);
      });
  },
});

export default categorySlice.reducer;
