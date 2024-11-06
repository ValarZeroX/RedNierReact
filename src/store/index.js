import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import communityReducer from './communitySlice';
import topicsReducer from './topicsSlice';
import communityDetailReducer from './communityDetailSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    community: communityReducer,
    topics: topicsReducer,
    communityDetail: communityDetailReducer,
  },
});
