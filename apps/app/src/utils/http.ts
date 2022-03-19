import axios from 'axios';

const token = localStorage.getItem('token');

const axiosInstance = axios.create({
  headers: token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : undefined,
});

export function setHTTPClientToken(token: string) {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default axiosInstance;
