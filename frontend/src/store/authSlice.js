// frontend/src/store/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../api/axiosClient';

export const login = createAsyncThunk('auth/login', async (payload, thunkAPI) => {
  const resp = await axiosClient.post('/auth/login', payload);
  return resp.data;
});

export const register = createAsyncThunk('auth/register', async (payload) => {
  const resp = await axiosClient.post('/auth/register', payload);
  return resp.data;
});

const initialState = {
  token: localStorage.getItem('token') || null,
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  status: 'idle',
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        state.status = 'succeeded';
      })
      .addCase(login.pending, (state) => { state.status = 'loading'; })
      .addCase(login.rejected, (state, action) => { state.status = 'failed'; state.error = action.error.message; })
      .addCase(register.fulfilled, (state, action) => {
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
        state.status = 'succeeded';
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
