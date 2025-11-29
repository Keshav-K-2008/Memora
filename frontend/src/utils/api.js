import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const register = (userData) => API.post('/auth/register', userData);
export const login = (userData) => API.post('/auth/login', userData);
export const getMe = () => API.get('/auth/me');

// Memory APIs
export const getMemories = () => API.get('/memories');
export const getMemory = (id) => API.get(`/memories/${id}`);
export const createMemory = (memoryData) => API.post('/memories', memoryData);
export const updateMemory = (id, memoryData) => API.put(`/memories/${id}`, memoryData);
export const deleteMemory = (id) => API.delete(`/memories/${id}`);

export default API;