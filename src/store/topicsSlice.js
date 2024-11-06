// src/store/topicsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTopics } from '../services/topicsService'; // 引入 fetchTopics 函數

// Async thunk 用於獲取主題資料
export const fetchTopicsThunk = createAsyncThunk(
  'topics/fetchTopics',
  async ({ communityId, page }, { rejectWithValue }) => {
    try {
      const data = await fetchTopics(communityId, page, 15);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || '無法獲取資料');
    }
  }
);

const topicsSlice = createSlice({
  name: 'topics',
  initialState: {
    topics: [],
    currentPage: 1,
    totalPages: 1,
    loading: false,
    error: null,
  },
  reducers: {
    resetTopics: (state) => {
      state.topics = [];
      state.currentPage = 1;
      state.totalPages = 1;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopicsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopicsThunk.fulfilled, (state, action) => {
        state.loading = false;

        // 過濾重複的主題
        const newTopics = action.payload.data.filter(
          (newTopic) => !state.topics.some((existingTopic) => existingTopic.id === newTopic.id)
        );

        state.topics = [...state.topics, ...newTopics];
        state.currentPage = action.payload.current_page;
        state.totalPages = action.payload.last_page;
      })
      .addCase(fetchTopicsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '無法獲取資料';
      });
  },
});

export const { resetTopics } = topicsSlice.actions;

export default topicsSlice.reducer;