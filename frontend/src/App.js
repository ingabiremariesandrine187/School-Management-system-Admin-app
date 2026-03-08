import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Teachers from './pages/Teachers';
import Classes from './pages/Classes';
import Transactions from './pages/Transactions';
import DeviceVerification from './pages/DeviceVerification';
import AcademicRecords from './pages/AcademicRecords';
import MarkAttendance from './pages/MarkAttendance';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import StudentManagement from './pages/StudentManagement';
import 'antd/dist/antd.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <div className="min-h-screen bg-gray-100">
                <Navbar />
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/students" element={<Students />} />
                    <Route path="/students/manage" element={<StudentManagement />} />
                    <Route path="/teachers" element={<Teachers />} />
                    <Route path="/teachers/attendance" element={<MarkAttendance />} />
                    <Route path="/classes" element={<Classes />} />
                    <Route path="/transactions" element={<Transactions />} />
                    <Route path="/device-verification" element={<DeviceVerification />} />
                    <Route path="/academic-records" element={<AcademicRecords />} />
                  </Routes>
                </div>
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
