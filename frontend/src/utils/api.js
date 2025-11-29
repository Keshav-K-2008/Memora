import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Log errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

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

// AI APIs
export const generateAICapsule = () => API.post('/ai/generate-capsule');
export const getCapsuleInfo = () => API.get('/ai/capsule-info');

export default API;