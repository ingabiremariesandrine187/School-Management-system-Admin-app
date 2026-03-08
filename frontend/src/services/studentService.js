import api from '../utils/api';

const API_BASE = process.env.REACT_APP_API_URL || '';

async function req(path, opts = {}) {
  const token = localStorage.getItem('token');
  opts.headers = { ...(opts.headers || {}), Authorization: token ? `Bearer ${token}` : '' };
  const res = await fetch(`${API_BASE}${path}`, opts);
  const text = await res.text();
  let body = {};
  try { body = text ? JSON.parse(text) : {}; } catch (e) { body = { raw: text }; }
  if (!res.ok) {
    const m = body.message || body.error || body.raw || `Request failed ${res.status}`;
    const err = new Error(m);
    err.status = res.status;
    throw err;
  }
  return body;
}

export async function fetchStudents(query = '') {
  return req(`/api/students${query ? `?${query}` : ''}`);
}

export async function fetchStudentsByClass(classId) {
  return req(`/api/students/by-class/${classId}`);
}

export async function createStudent(payload) {
  return req('/api/students', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

export async function updateStudent(id, payload) {
  return req(`/api/students/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

export async function deleteStudent(id) {
  return req(`/api/students/${id}`, { method: 'DELETE' });
}

// named and default export for compatibility with existing imports
export const studentService = { fetchStudents, fetchStudentsByClass, createStudent, updateStudent, deleteStudent };
export default studentService;