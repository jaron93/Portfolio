import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '../../services/api'
import { setAuthTokens } from 'axios-jwt'


interface ISignupFormData {
   username: string;
   email: string;
   password: string;
}

interface ISigninFormData {
   username: string;
   password: string;
}


export const signupUser = createAsyncThunk(
   'users/signup',
   async ({ username, email, password }: ISignupFormData, thunkAPI) => {
      try {
         const response = await axiosInstance.post('/api/auth/signup', { username, email, password })

         const data = await response.data;

         if (response.status === 200) {
            return { ...data };
         } else {
            return thunkAPI.rejectWithValue(data);
         }
      } catch (e) {
         console.log('Error', e.response.data);
         return thunkAPI.rejectWithValue(e.response.data);
      }

   });

export const signinUser = createAsyncThunk(
   'users/signin',
   async ({ username, password }: ISigninFormData, thunkAPI) => {
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
   userInfo: {} | any,
   onlineUsers: [],
   status: "idle" | "loading" | "succeeded" | "failed",
   error: string | null,
}


const initialState: UserState = {
   userInfo: false && {},
   onlineUsers: [],
   status: "idle",
   error: null,
};

export const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      clearState() {
         return initialState;
      },
      setOnlineUsers: (state, { payload }: PayloadAction<any>) => {
         state.onlineUsers = payload
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(signupUser.pending, (state) => {
            state.status = "loading";
         })
         .addCase(signupUser.fulfilled, (state) => {
            state.status = "succeeded";
            state.error = null
         })
         .addCase(signupUser.rejected, (state, action: any) => {
            state.status = "failed";
            if (action.payload) {
               state.error = action.payload.message;
            } else {
               state.error = "Server is currently unavaible."
            }
         })
         .addCase(signinUser.pending, (state) => {
            state.status = "loading";
         })
         .addCase(signinUser.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.userInfo = action.payload
            state.error = null
         })
         .addCase(signinUser.rejected, (state, action: any) => {
            state.status = "failed";
            if (action.payload) {
               state.error = action.payload.message;
            } else {
               state.error = "Server is currently unavaible."
            }
         })
   }
});


export default userSlice.reducer;

export const { clearState, setOnlineUsers } = userSlice.actions;



