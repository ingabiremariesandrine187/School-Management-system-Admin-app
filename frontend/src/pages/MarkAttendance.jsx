import React, { useEffect, useState } from 'react';
import { markAttendance, fetchClasses, fetchStudentsByClass } from '../services/attendanceService';

export default function MarkAttendance() {
  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(today);
  const [classId, setClassId] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const [records, setRecords] = useState([{ studentId: '', status: 'present', remarks: '' }]);
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchClasses();
        const list = Array.isArray(data) ? data : data.data || [];
        setClasses(list);
      } catch (err) {
        console.error('fetchClasses error', err);
        setMessage(err.message || 'Failed to load classes');
      }
    })();
  }, []);

  useEffect(() => {
    if (!classId) {
      setStudents([]);
      return;
    }
    // auto-load students when class changes, but keep explicit Load button if needed
    (async () => {
      try {
        const data = await fetchStudentsByClass(classId);
        const list = Array.isArray(data) ? data : data.data || [];
        setStudents(list);
        // ensure record studentIds are reset if they don't belong
        setRecords(prev => prev.map(r => ({ ...r, studentId: '' })));
      } catch (err) {
        console.error('fetchStudentsByClass error', err);
        setMessage(err.message || 'Failed to load students');
        setStudents([]);
      }
    })();
  }, [classId]);

  const loadStudentsNow = async () => {
    if (!classId) return setMessage('Select a class first');
    try {
      setMessage('Loading students...');
      const data = await fetchStudentsByClass(classId);
      setStudents(Array.isArray(data) ? data : data.data || []);
      setMessage('');
    } catch (err) {
      setMessage(err.message || 'Failed to load students');
    }
  };

  const addRow = () => setRecords([...records, { studentId: '', status: 'present', remarks: '' }]);
  const removeRow = (i) => setRecords(records.filter((_, idx) => idx !== i));
  const updateRow = (i, field, value) => {
    const copy = [...records];
    copy[i][field] = value;
    setRecords(copy);
  };

  const submit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    try {
      const payload = { date, classId, subjectId, records };
      await markAttendance(payload);
      setMessage('Attendance saved');
    } catch (err) {
      console.error('markAttendance error', err);
      setMessage(err.message || 'Error saving attendance');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <h2>Mark Attendance</h2>

      <form onSubmit={submit}>
        <div>
          <label>Date</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
        </div>

        <div>
          <label>Class</label>
          <select value={classId} onChange={e => setClassId(e.target.value)} required>
            <option value="">Select class</option>
            {classes.map(c => (
              <option key={c._id || c.id} value={c._id || c.id}>
                {c.name || c.title || `${c._id || c.id}`}
              </option>
            ))}
          </select>
          <button type="button" onClick={loadStudentsNow} style={{ marginLeft: 8 }}>Load students</button>
        </div>

        <div>
          <label>Subject ID (optional)</label>
          <input value={subjectId} onChange={e => setSubjectId(e.target.value)} />
        </div>

        <h4>Records</h4>
        {records.map((r, i) => (
          <div key={i} style={{ border: '1px solid #eee', padding: 8, marginBottom: 8 }}>
            <div>
              <label>Student</label>
              <select value={r.studentId} onChange={e => updateRow(i, 'studentId', e.target.value)} required>
                <option value="">Select student</option>
                {students.length === 0 && <option value="">-- no students loaded --</option>}
                {students.map(s => {
                  const sid = s._id || s.id;
                  const name = s.name || `${s.firstName || ''} ${s.lastName || ''}`.trim() || sid;
                  return <option key={sid} value={sid}>{name}</option>;
                })}
              </select>
            </div>

            <div>
              <label>Status</label>
              <select value={r.status} onChange={e => updateRow(i, 'status', e.target.value)}>
                <option value="present">present</option>
                <option value="absent">absent</option>
                <option value="late">late</option>
              </select>
            </div>

            <div>
              <label>Remarks</label>
              <input value={r.remarks} onChange={e => updateRow(i, 'remarks', e.target.value)} />
            </div>

            <div>
              <button type="button" onClick={() => removeRow(i)} disabled={records.length === 1}>Remove</button>
            </div>
          </div>
        ))}

        <div>
          <button type="button" onClick={addRow}>Add record</button>
        </div>

        <div style={{ marginTop: 12 }}>
          <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Attendance'}</button>
        </div>

        {message && <div style={{ marginTop: 12 }}>{message}</div>}
      </form>
    </div>
  );
}