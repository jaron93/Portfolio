import { IAuthTokens, TokenRefreshRequest, applyAuthTokenInterceptor } from 'axios-jwt'
import axios from 'axios'

const BASE_URL = process.env.REACT_APP_API_URL

// 1. Create an axios instance that you wish to apply the interceptor to
export const axiosInstance = axios.create({ baseURL: BASE_URL })

// 2. Define token refresh function.
const requestRefresh: TokenRefreshRequest = async (refreshToken: string): Promise<IAuthTokens | string> => {

   // Important! Do NOT use the axios instance that you supplied to applyAuthTokenInterceptor (in our case 'axiosInstance')
   // because this will result in an infinite loop when trying to refresh the token.
   // Use the global axios client or a different instance
   const response = await axios.post(`${BASE_URL}/api/auth/refreshToken`, { refreshToken })

   // If your backend supports rotating refresh tokens, you may also choose to return an object containing both tokens:
   // return {
   //  accessToken: response.data.access_token,
   //  refreshToken: response.data.refresh_token
   //}

   return response.data.accessToken
}

// 3. Add interceptor to your axios instance
applyAuthTokenInterceptor(axiosInstance, {
   requestRefresh,  // async function that takes a refreshToken and returns a promise the resolves in a fresh accessToken
   header: "x-access-token",  // header name
   headerPrefix: "",  // header value prefix})
})

export default axiosInstance;