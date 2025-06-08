import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVICE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: { indexes: null },
});
