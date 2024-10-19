import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isLoggedIn: !!localStorage.getItem('token'),
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
