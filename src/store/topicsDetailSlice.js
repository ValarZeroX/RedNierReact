import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTopicDetails } from '../services/topicsService';

export const fetchTopicDetailsThunk = createAsyncThunk(
    'topicDetail/fetchTopicDetails',
    async ({ topicId, page, perPage }, { rejectWithValue }) => {
      try {
        const response = await fetchTopicDetails(topicId, page, perPage);
        return response;
      } catch (error) {
        const status = error.response?.status;
        const message = error.response?.data?.message || error.message || '获取数据时出错';
        return rejectWithValue({ message, status });
      }
    }
  );

const topicsDetailSlice = createSlice({
  name: 'topicDetail',
  initialState: {
    topic: null,
    posts: [],
    loading: false,
    error: null,
    currentPage: 1,
    perPage: 5,
    hasMore: true,
  },
  reducers: {
    resetTopicDetail: (state) => {
      state.topic = null;
      state.posts = [];
      state.loading = false;
      state.error = null;
      state.currentPage = 1;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopicDetailsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopicDetailsThunk.fulfilled, (state, action) => {
        state.loading = false;
        const { topic, posts } = action.payload;

        if (action.meta.arg.page === 1) {
          // 初始加载，覆蓋 existing posts
          state.topic = topic;
          state.posts = posts.data;
        } else {
          // 加载更多帖子，追加到现有 posts
          state.posts = [...state.posts, ...posts.data];
        }

        state.hasMore = posts.current_page < posts.last_page;
        state.currentPage = posts.current_page + 1;
      })
      .addCase(fetchTopicDetailsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { message: '获取数据时出错' };
      });
  },
});

export const { resetTopicDetail } = topicsDetailSlice.actions;

export default topicsDetailSlice.reducer;