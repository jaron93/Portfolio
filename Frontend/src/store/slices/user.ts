import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '../../services/api'
import { setAuthTokens, isLoggedIn } from 'axios-jwt'

import { PURGE } from "redux-persist";
import { dispatch } from 'react-hot-toast/dist/core/store';

if (isLoggedIn()) {
   // assume we are logged in because we have a refresh token
}

interface ISignUpFormData {
   username: string;
   email: string;
   password: string;
}

interface ILoginFormData {
   username: string;
   password: string;
}


export const signupUser = createAsyncThunk(
   'users/signupUser',
   async ({ username, email, password }: ISignUpFormData, thunkAPI) => {
      try {
         const response = await axiosInstance.post('/api/auth/signup', { username, email, password })

         let data = await response;
         console.log('data', data);
         if (response.status === 200) {
            return { ...data, username: username, email: email };
         } else {
            return thunkAPI.rejectWithValue(data);
         }
      } catch (e) {
         console.log('Error', e.response.data);
         return thunkAPI.rejectWithValue(e.response.data);
      }
   }
);

export const loginUser = createAsyncThunk(
   'users/login',
   async ({ username, password }: ILoginFormData, thunkAPI) => {
      try {
         const response = await axiosInstance.post('/api/auth/signin', { username, password })

         // save tokens to storage
         setAuthTokens({
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken
         })
         const data = await response.data;

         if (response.status === 200) {
            return { ...data, username: username };
         } else {
            return thunkAPI.rejectWithValue(data);
         }
      } catch (e) {
         console.log('Error', e.response.data);
         return thunkAPI.rejectWithValue(e.response.data);
      }

   });

export interface UserState {
   userInfo: {},
   status: "idle" | "loading" | "succeeded" | "failed",
   error: string | null,
}

export interface User {
   id: string,
   date: string,
   title: string,
   content: string,
   user: string,
}

const initialState: UserState = {
   userInfo: false && {},
   status: "idle",
   error: null,
};

export const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      clearState() {
         return initialState;
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(loginUser.pending, (state) => {
            state.status = "loading";
         })
         .addCase(loginUser.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.userInfo = action.payload
            state.error = null
         })
         .addCase(loginUser.rejected, (state, action: any) => {
            state.status = "failed";
            if (action.payload) {
               state.error = action.payload.message;
            } else {
               state.error = "Server is currently unavaible."
            }
         });
   }
});


export default userSlice.reducer;

export const { clearState } = userSlice.actions;



