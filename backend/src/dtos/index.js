exports.userDTO = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  isDeviceVerified: user.isDeviceVerified,
  createdAt: user.createdAt
});

exports.studentDTO = (student) => ({
  id: student._id,
  name: student.name,
  email: student.email,
  classId: student.classId,
  feeBalance: student.feeBalance,
  createdAt: student.createdAt
});

exports.teacherDTO = (teacher) => ({
  id: teacher._id,
  name: teacher.name,
  email: teacher.email,
  subject: teacher.subject,
  assignedClasses: teacher.assignedClasses
});

exports.classDTO = (classData) => ({
  id: classData._id,
  name: classData.name,
  grade: classData.grade,
  teacherId: classData.teacherId,
  schedule: classData.schedule
});

exports.transactionDTO = (transaction) => ({
  id: transaction._id,
  studentId: transaction.studentId,
  type: transaction.type,
  amount: transaction.amount,
  status: transaction.status,
  description: transaction.description,
  createdAt: transaction.createdAt
});
