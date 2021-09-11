import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../services/api';
import { setAuthTokens, clearAuthTokens } from '../../services/token.service'

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
         const response = await api.post('/api/auth/signup', { username, email, password })

         const data = await response.data;

         if (response.status === 200) {
            return { ...data };
         } else {
            return thunkAPI.rejectWithValue(data);
         }
      } catch (error: any) {
         console.log('Error', error.response.data);
         return thunkAPI.rejectWithValue(error.response.data);
      }

   });

export const signinUser = createAsyncThunk(
   'users/signin',
   async ({ username, password }: ISigninFormData, thunkAPI) => {
      try {
         const response = await api.post('/api/auth/signin', { username, password })

         // save tokens to storage
         setAuthTokens({
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken
         })

         const { accessToken, refreshToken, ...other } = await response.data;

         if (response.status === 200) {
            return { ...other };
         } else {
            return thunkAPI.rejectWithValue(other);
         }
      } catch (error: any) {
         console.log('Error', error.response.data);
         return thunkAPI.rejectWithValue(error.response.data);
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
      logout() {
         clearAuthTokens()
      },
      clearState() {
         return initialState
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

export const { logout, setOnlineUsers, clearState } = userSlice.actions;



