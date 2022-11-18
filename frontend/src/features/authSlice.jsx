import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  newUser: '',
  roles: '',
  token: '',
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  _id: '',
  registerStatus: '',
  registerError: '',
  loginStatus: '',
  loginError: '',
  userLoaded: '',
};

const url = 'http://localhost:8000/api';

// an action creator
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (user, { rejectWithValue }) => {
    try {
      const regData = await axios.post(`${url}/signup`, {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      });
      console.log('regData  data = ', regData.data);
      return regData.data;
    } catch (error) {
      console.log(error.error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      return { ...state, registerStatus: 'pending' };
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload) {
        const new_user = action.payload;
        return {
          ...state,
          newUser: new_user,
          username: new_user.username,
          registerStatus: 'success',
        };
      } else {
        return state;
      }
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      return {
        ...state,
        registerStatus: 'rejected',
        registerError: action.payload,
      };
    });
  },
});
/*
regData.data.error = false
regData.data.message = 'user account created successfully';
regData.data.new_user = user data (email, firstName ...roles, _id)
*/

export default authSlice.reducer;
