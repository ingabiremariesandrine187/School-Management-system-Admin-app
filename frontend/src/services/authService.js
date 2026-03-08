import api from '../utils/api';
import axios from '../setupAxios';

export const authService = {
  login: async (email, password, deviceId) => {
    const response = await api.post('/auth/login', { email, password, deviceId });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  getPendingVerifications: () => api.get('/auth/pending-verifications'),
  verifyDevice: (userId) => api.put(`/auth/verify-device/${userId}`),
  // ...existing code...
};

export async function login(credentials) {
  const res = await axios.post('/api/auth/login', credentials);
  const token = res.data.token || res.token;
  if (token) {
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  return res.data;
}
