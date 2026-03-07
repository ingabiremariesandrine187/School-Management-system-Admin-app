const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Class = require('../models/Class');
const Transaction = require('../models/Transaction');

exports.getDashboardStats = async () => {
  const totalStudents = await Student.countDocuments();
  const totalTeachers = await Teacher.countDocuments();
  const totalClasses = await Class.countDocuments();
  
  const transactions = await Transaction.find({ status: 'approved', type: 'deposit' });
  const totalFeeCollection = transactions.reduce((sum, t) => sum + t.amount, 0);
  
  const students = await Student.find();
  const totalAttendance = students.reduce((sum, s) => {
    const present = s.attendance.filter(a => a.status === 'present').length;
    const total = s.attendance.length;
    return sum + (total > 0 ? (present / total) * 100 : 0);
  }, 0);
  const attendanceRate = students.length > 0 ? totalAttendance / students.length : 0;

  const pendingTransactions = await Transaction.countDocuments({ status: 'pending' });

  return {
    totalStudents,
    totalTeachers,
    totalClasses,
    totalFeeCollection,
    attendanceRate: attendanceRate.toFixed(2),
    pendingTransactions
  };
};
