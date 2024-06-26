import axios from 'axios';
import { getBaseUrl } from "../utils/urlUtil.ts";

const axiosInstance = axios.create({
    baseURL: getBaseUrl(), // Replace with your actual base URL
    withCredentials: true
});

axiosInstance.interceptors.request.use(
    (config) => {
        // Log or modify request here
        console.log("Sending request to:", config);
        return config;
    },
    (error) => {
        // Handle request error here
        return Promise.reject(error);
    }
);


axiosInstance.interceptors.response.use(
    (response) => {
      // Log or modify response here
      console.log("Received response from:", response.config.url);
      return response;
    },
    (error) => {
      // Handle response error here
      return Promise.reject(error);
    }
  );

export default axiosInstance;