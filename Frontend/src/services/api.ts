import axios from "axios";
import {
   getAccessToken,
   getRefreshToken,
   updateAccessToken
} from "./token.service";

//Url is stored in .env files 
const BASE_URL = process.env.REACT_APP_API_URL

const axiosInstance = axios.create({
   baseURL: BASE_URL,
   headers: {
      "Content-Type": "application/json",
   },
});

//Interceptor settings for axios instance.
//Send x-access-token with header with every inquiry without login. Otherwise api respond error.
axiosInstance.interceptors.request.use(
   (config) => {
      const token = getAccessToken();
      if (token) {
         config.headers["x-access-token"] = token;
      }
      return config;
   },
   (error) => {
      return Promise.reject(error);
   }
);

axiosInstance.interceptors.response.use(
   (res) => {
      return res;
   },
   async (err) => {
      const originalConfig = err.config;

      if (originalConfig.url !== "/api/auth/signin" && err.response) {
         // Access Token was expired
         if (err.response.status === 401 && !originalConfig._retry) {
            originalConfig._retry = true;

            try {
               const rs = await axiosInstance.post("api/auth/refreshtoken", {
                  refreshToken: getRefreshToken(),
               });

               const { accessToken } = rs.data;
               updateAccessToken(accessToken);

               return axiosInstance(originalConfig);
            } catch (_error) {
               return Promise.reject(_error);
            }
         }
      }

      return Promise.reject(err);
   }
);

export default axiosInstance;
