import api from '../utils/api';

export const attendanceService = {
  create: (records) => api.post('/attendance', records),
  getByStudent: (id) => api.get(`/students/${id}/attendance`),
};

const API_BASE = process.env.REACT_APP_API_URL || '';

async function jsonRequest(url, opts = {}) {
  const token = localStorage.getItem('token');
  opts.headers = { ...(opts.headers || {}), Authorization: token ? `Bearer ${token}` : '' };
  const res = await fetch(`${API_BASE}${url}`, opts);
  const text = await res.text();
  let body = {};
  try { body = text ? JSON.parse(text) : {}; } catch (e) { body = { raw: text }; }
  if (!res.ok) {
    const message = body.message || body.error || body.raw || `Request failed ${res.status}`;
    const err = new Error(message);
    err.status = res.status;
    throw err;
  }
  return body;
}

export async function markAttendance(payload) {
  return jsonRequest('/api/admin/attendance/mark', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

export async function fetchClasses() {
  return jsonRequest('/api/classes'); // expects array or { data: [...] }
}

export async function fetchStudentsByClass(classId) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_BASE}/api/students/by-class/${classId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to load students for class');
  return res.json();
}