import React, { useState, useEffect } from "react";
import { teacherService } from "../services/teacherService";
import { studentService } from "../services/studentService";
import { attendanceService } from "../services/attendanceService";
import { Link } from "react-router-dom";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [attendance, setAttendance] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await fetchTeachers();
      await fetchClasses();
      setLoading(false);
    };
    fetchData();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await teacherService.getAll();
      setTeachers(response.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await teacherService.getClasses();
      setClasses(response.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const fetchStudents = async (classId) => {
    try {
      if (!classId) return;
      const response = await studentService.getByClass(classId);
      setStudents(response.data);

      const initialAttendance = {};
      response.data.forEach((student) => {
        initialAttendance[student._id] = "present";
      });
      setAttendance(initialAttendance);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleClassChange = (e) => {
    const classId = e.target.value;
    setSelectedClass(classId);
    if (classId) fetchStudents(classId);
  };

  const handleStatusChange = (studentId, status) => {
    setAttendance((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleSubmitAttendance = async () => {
    try {
      // Validate that a class is selected
      if (!selectedClass) {
        setMessage("Please select a class first");
        setTimeout(() => setMessage(""), 3000);
        return;
      }

      // Validate that there are students
      if (students.length === 0) {
        setMessage("No students in this class");
        setTimeout(() => setMessage(""), 3000);
        return;
      }

      const records = Object.keys(attendance).map((studentId) => ({
        studentId,
        classId: selectedClass,
        status: attendance[studentId],
        date: new Date(),
      }));

      await attendanceService.create(records);
      setMessage("Attendance saved successfully!");
      
      // Reset form
      setSelectedClass("");
      setStudents([]);
      setAttendance({});
      
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error(error);
      setMessage("Error saving attendance");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await teacherService.delete(id);
        fetchTeachers();
        setMessage("Teacher deleted successfully!");
        setTimeout(() => setMessage(""), 3000);
      } catch (error) {
        setMessage("Error deleting teacher");
        setTimeout(() => setMessage(""), 3000);
      }
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Teachers Management
        </h1>
        <Link to="/teachers/attendance">
          <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center space-x-2 font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span>View Attendance History</span>
          </button>
        </Link>
      </div>

      {message && (
        <div className={`mb-6 px-4 py-3 rounded-lg shadow-lg flex items-center ${
          message.includes("Error") || message.includes("Please") 
            ? "bg-red-500 text-white" 
            : "bg-green-500 text-white"
        }`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            {message.includes("Error") || message.includes("Please") ? (
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            ) : (
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            )}
          </svg>
          {message}
        </div>
      )}

      {/* Teachers Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-10">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Teachers List</h2>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-gray-600 font-semibold text-sm uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-semibold text-sm uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-semibold text-sm uppercase tracking-wider">
                Subject
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-semibold text-sm uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {teachers.length > 0 ? (
              teachers.map((t) => (
                <tr key={t._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-800 font-medium">{t.name}</td>
                  <td className="px-6 py-4 text-gray-600">{t.email}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {t.subject}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(t._id)}
                      className="bg-red-500 text-white px-4 py-1.5 rounded-lg hover:bg-red-600 transition-all duration-300 shadow-sm hover:shadow-md text-sm font-medium flex items-center space-x-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                  No teachers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Attendance Section - This is the form you wanted */}
      {classes.length > 0 && (
        <div className="bg-white p-8 rounded-xl shadow-lg mb-10">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Take Attendance</h2>

          <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-700">Select Class</label>
            <select
              value={selectedClass}
              onChange={handleClassChange}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-200"
            >
              <option value="">-- Select Class --</option>
              {classes.map(cls => (
                <option key={cls._id} value={cls._id}>{cls.name}</option>
              ))}
            </select>
          </div>

          {students.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-gray-700 font-semibold">Student</th>
                    <th className="px-6 py-3 text-left text-gray-700 font-semibold">Email</th>
                    <th className="px-6 py-3 text-left text-gray-700 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {students.map(s => (
                    <tr key={s._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-gray-800 font-medium">{s.name}</td>
                      <td className="px-6 py-4 text-gray-600">{s.email}</td>
                      <td className="px-6 py-4">
                        <select
                          value={attendance[s._id]}
                          onChange={(e) => handleStatusChange(s._id, e.target.value)}
                          className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-200"
                        >
                          <option value="present">Present</option>
                          <option value="absent">Absent</option>
                          <option value="late">Late</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-6 text-right">
                <button
                  onClick={handleSubmitAttendance}
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-8 py-3 rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow-md hover:shadow-lg font-semibold text-lg"
                >
                  Save Attendance
                </button>
              </div>
            </div>
          )}

          {selectedClass && students.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No students found in this class</p>
            </div>
          )}
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
          <h3 className="text-gray-600 text-sm font-semibold uppercase tracking-wider">Total Teachers</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">{teachers.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <h3 className="text-gray-600 text-sm font-semibold uppercase tracking-wider">Total Classes</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">{classes.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <h3 className="text-gray-600 text-sm font-semibold uppercase tracking-wider">Subjects</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {new Set(teachers.map(t => t.subject)).size}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Teachers;
