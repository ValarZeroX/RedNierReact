import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { communityService } from '../services/communityService';

export const fetchCommunities = createAsyncThunk(
  'community/fetchCommunities',
  async ({ subCategoryId, page }, { rejectWithValue }) => {
    try {
      const data = await communityService.getCommunities(subCategoryId, page);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

const communitySlice = createSlice({
  name: 'community',
  initialState: {
    communities: [],
    currentPage: 1,
    totalPages: 1,
    currentCommunity: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommunities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommunities.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.current_page === 1) {
          state.communities = action.payload.data;
        } else {
          state.communities = [...state.communities, ...action.payload.data];
        }
        state.currentPage = action.payload.current_page;
        state.totalPages = action.payload.last_page;
      })
      .addCase(fetchCommunities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
      });
  },
});

export default communitySlice.reducer;
