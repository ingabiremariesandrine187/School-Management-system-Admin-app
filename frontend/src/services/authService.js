import api from '../utils/api';

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
  verifyDevice: (userId) => api.put(`/auth/verify-device/${userId}`)
};
