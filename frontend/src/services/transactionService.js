import api from '../utils/api';

export const transactionService = {
  getAll: () => api.get('/transactions'),
  getByStudent: (studentId) => api.get(`/transactions/student/${studentId}`),
  create: (data) => api.post('/transactions', data),
  approve: (id) => api.put(`/transactions/${id}/approve`),
  reject: (id) => api.put(`/transactions/${id}/reject`)
};
