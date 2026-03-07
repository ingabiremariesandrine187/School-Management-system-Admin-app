import React, { useState, useEffect } from 'react';
import { studentService } from '../services/studentService';

const AcademicRecords = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [grades, setGrades] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('grades'); // 'grades' or 'attendance'

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await studentService.getAll();
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectStudent = async (studentId) => {
    setSelectedStudent(studentId);
    try {
      const gradesRes = await studentService.getGrades(studentId);
      const attendanceRes = await studentService.getAttendance(studentId);
      setGrades(gradesRes.data);
      setAttendance(attendanceRes.data);
    } catch (error) {
      console.error('Error fetching academic records:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">
      <div className="text-xl text-gray-600">Loading...</div>
    </div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Academic Records</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student List */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4">Select Student</h2>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {students.map((student) => (
              <button
                key={student.id}
                onClick={() => handleSelectStudent(student.id)}
                className={`w-full text-left px-4 py-2 rounded transition duration-200 ${
                  selectedStudent === student.id
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {student.name}
              </button>
            ))}
          </div>
        </div>

        {/* Academic Records Display */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          {!selectedStudent ? (
            <div className="text-center text-gray-500 py-12">
              Select a student to view their academic records
            </div>
          ) : (
            <>
              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setView('grades')}
                  className={`px-6 py-2 rounded transition duration-200 ${
                    view === 'grades'
                      ? 'bg-yellow-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Grades
                </button>
                <button
                  onClick={() => setView('attendance')}
                  className={`px-6 py-2 rounded transition duration-200 ${
                    view === 'attendance'
                      ? 'bg-yellow-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Attendance
                </button>
              </div>

              {view === 'grades' ? (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Grades</h3>
                  {grades.length === 0 ? (
                    <p className="text-gray-500">No grades recorded yet</p>
                  ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Term</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {grades.map((grade, index) => (
                          <tr key={index}>
                            <td className="px-4 py-2">{grade.subject}</td>
                            <td className="px-4 py-2 font-semibold">{grade.score}</td>
                            <td className="px-4 py-2">{grade.term}</td>
                            <td className="px-4 py-2">{new Date(grade.date).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Attendance</h3>
                  {attendance.length === 0 ? (
                    <p className="text-gray-500">No attendance records yet</p>
                  ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {attendance.map((record, index) => (
                          <tr key={index}>
                            <td className="px-4 py-2">{new Date(record.date).toLocaleDateString()}</td>
                            <td className="px-4 py-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                record.status === 'present' ? 'bg-green-100 text-green-800' :
                                record.status === 'absent' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {record.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AcademicRecords;
