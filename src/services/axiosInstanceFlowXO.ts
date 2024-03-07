import axios from 'axios';

const axiosInstanceFlowXO = axios.create({
    baseURL: "https://flowxo.com", // Replace with your actual base URL
    // withCredentials: true,
    headers: {
      'Cookie': 'flowxo.sid=s%3AFXUMxQtzYrKYFKEzWM4Lz1ZhkGis20fM.tBO3ApXJuqI9M8X8gItyH1zQTC%2F5E3VcUcAeEjXe9PU',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTlmZjNiNGQ4MjM5ODAwN2M2NDk3MzkiLCJyb2xlIjoidXNlciIsImZlYXR1cmVzIjpbXSwiYXBpX2tleSI6dHJ1ZSwiaWF0IjoxNzA0OTgxNDI4fQ.yWKEfsUADHiF2B4fu8Pf8JTRQWsCPz98KpWj3mpGQT8',
    }
});

axiosInstanceFlowXO.interceptors.request.use(
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


axiosInstanceFlowXO.interceptors.response.use(
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

export default axiosInstanceFlowXO;