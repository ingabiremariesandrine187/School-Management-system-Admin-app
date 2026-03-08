import React, { useEffect, useState } from 'react';
import { fetchStudents, createStudent, fetchStudentsByClass } from '../services/studentService';
import { fetchClasses } from '../services/attendanceService';

export default function StudentManagement() {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    admissionNumber: '',
    classId: ''
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const [filterClass, setFilterClass] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const cls = await fetchClasses();
        console.log('fetchClasses ->', cls);
        setClasses(Array.isArray(cls) ? cls : (cls.data || []));
        const studs = await fetchStudents();
        console.log('fetchStudents ->', studs);
        setStudents(Array.isArray(studs) ? studs : (studs.data || []));
      } catch (e) {
        setError(e.message || 'Failed to load data');
        console.error('StudentManagement load error', e);
      }
    })();
  }, []);

  const loadByClass = async (cid) => {
    setFilterClass(cid || '');
    try {
      if (!cid) {
        const all = await fetchStudents();
        setStudents(Array.isArray(all) ? all : (all.data || []));
        return;
      }
      const list = await fetchStudentsByClass(cid);
      setStudents(Array.isArray(list) ? list : (list.data || []));
    } catch (e) {
      setError(e.message || 'Failed to load students');
    }
  };

  const onChange = (k, v) => {
    setForm(prev => ({ ...prev, [k]: v }));
    setError('');
    setMsg('');
  };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setMsg('');
    if (!form.firstName.trim()) return setError('First name is required');
    setLoading(true);
    try {
      const created = await createStudent(form);
      setStudents(prev => [created, ...prev]);
      setForm({ firstName: '', lastName: '', admissionNumber: '', classId: '' });
      setMsg('Student created');
    } catch (err) {
      setError(err.message || 'Failed to create student');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Student Management</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <form onSubmit={submit} className="col-span-1 bg-white border rounded p-4 shadow-sm">
          <h3 className="font-medium mb-3">Add student</h3>

          <label className="block text-sm text-gray-600">First name</label>
          <input
            className="w-full border rounded px-3 py-2 mb-2"
            value={form.firstName}
            onChange={e => onChange('firstName', e.target.value)}
            required
          />

          <label className="block text-sm text-gray-600">Last name</label>
          <input
            className="w-full border rounded px-3 py-2 mb-2"
            value={form.lastName}
            onChange={e => onChange('lastName', e.target.value)}
          />

          <label className="block text-sm text-gray-600">Admission #</label>
          <input
            className="w-full border rounded px-3 py-2 mb-2"
            value={form.admissionNumber}
            onChange={e => onChange('admissionNumber', e.target.value)}
          />

          <label className="block text-sm text-gray-600">Assign class</label>
          <select
            className="w-full border rounded px-3 py-2 mb-4"
            value={form.classId}
            onChange={e => onChange('classId', e.target.value)}
          >
            <option value="">-- none --</option>
            {classes.map(c => <option key={c._id || c.id} value={c._id || c.id}>{c.name || c.title}</option>)}
          </select>

          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-60" disabled={loading}>
              {loading ? 'Saving...' : 'Create student'}
            </button>
            <button type="button" className="px-3 py-2 border rounded" onClick={() => setForm({ firstName: '', lastName: '', admissionNumber: '', classId: '' })}>
              Reset
            </button>
          </div>

          {error && <div className="mt-3 text-red-600 text-sm">{error}</div>}
          {msg && <div className="mt-3 text-green-600 text-sm">{msg}</div>}
        </form>

        <div className="col-span-2">
          <div className="bg-white border rounded p-4 shadow-sm mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <label className="text-sm text-gray-600">Filter by class</label>
              <select
                className="border rounded px-3 py-2"
                value={filterClass}
                onChange={e => loadByClass(e.target.value)}
              >
                <option value="">All classes</option>
                {classes.map(c => <option key={c._id || c.id} value={c._id || c.id}>{c.name}</option>)}
              </select>
            </div>

            <div className="text-sm text-gray-500">Total students: <span className="font-medium">{students.length}</span></div>
          </div>

          <div className="overflow-x-auto bg-white border rounded p-4 shadow-sm">
            <table className="w-full table-auto">
              <thead>
                <tr className="text-left text-sm text-gray-600">
                  <th className="pb-2">Name</th>
                  <th className="pb-2 hidden sm:table-cell">Admission #</th>
                  <th className="pb-2 hidden md:table-cell">Class</th>
                  <th className="pb-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map(s => {
                  const cid = (s.classId && (s.classId.name ? s.classId.name : (s.classId._id || s.classId))) || '';
                  return (
                    <tr key={s._id || s.id} className="border-t">
                      <td className="py-3">
                        <div className="font-medium">{s.firstName} {s.lastName}</div>
                        <div className="text-xs text-gray-500 sm:hidden">{cid}</div>
                      </td>
                      <td className="py-3 hidden sm:table-cell">{s.admissionNumber || '—'}</td>
                      <td className="py-3 hidden md:table-cell">{cid || '—'}</td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          <button className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm">Edit</button>
                          <button className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm">Delete</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {students.length === 0 && (
                  <tr>
                    <td colSpan="4" className="py-6 text-center text-gray-500">No students found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}