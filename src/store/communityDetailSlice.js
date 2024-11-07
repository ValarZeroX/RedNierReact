import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { communityService } from '../services/communityService';

// 异步获取社区详情的 Thunk
export const fetchCommunityById = createAsyncThunk(
  'communityDetail/fetchCommunityById',
  async (communityId, { rejectWithValue }) => {
    try {
      const data = await communityService.getCommunityById(communityId);
      return data;
    } catch (error) {
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || error.message || 'An error occurred';
        return rejectWithValue({ status, message });
    }
  }
);

// 创建新的 Slice
const communityDetailSlice = createSlice({
  name: 'communityDetail',
  initialState: {
    community: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetCurrentCommunity: (state) => {
      state.community = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommunityById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommunityById.fulfilled, (state, action) => {
        state.loading = false;
        state.community = action.payload;
      })
      .addCase(fetchCommunityById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
      });
  },
});

export const { resetCurrentCommunity } = communityDetailSlice.actions;

export default communityDetailSlice.reducer;
