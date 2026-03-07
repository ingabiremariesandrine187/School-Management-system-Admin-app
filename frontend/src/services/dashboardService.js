import api from '../utils/api';

export const dashboardService = {
  getStats: () => api.get('/dashboard/stats')
};
