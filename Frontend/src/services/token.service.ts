import { useSelector } from "react-redux";

//Check if token and user data are exist
export const IsLoggedIn = () => {
   const { userInfo } = useSelector(state => state.user)
   const token = getRefreshToken()
   return !!token && userInfo
}

export const STORAGE_KEY = `auth-tokens-${process.env.NODE_ENV}`

type Token = string

interface IAuthTokens {
   accessToken: Token
   refreshToken: Token
}

export const getRefreshToken = (): IAuthTokens | undefined => {
   const token = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
   return token?.refreshToken
};

export const getAccessToken = (): IAuthTokens | undefined => {
   const token = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
   return token?.accessToken;
};

export const setAuthTokens = (tokens: IAuthTokens): void => localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens))

export const updateAccessToken = (token: Token): void => {
   const tokens = getAccessToken()
   if (!tokens) {
      throw new Error('Unable to update access token since there are not tokens currently stored')
   }

   tokens.accessToken = token
   setAuthTokens(tokens)
}

export const clearAuthTokens = (): void => localStorage.removeItem(STORAGE_KEY)

