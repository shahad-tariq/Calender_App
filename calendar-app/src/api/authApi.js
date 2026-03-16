// src/api/authApi.js
import axios from '../api/axiosInstance';

export const loginRequest = ({ username, password }) => {
  return axios.get('/Login', {
    params: {
      name: username,
      pass: password,
    },
  });
};
