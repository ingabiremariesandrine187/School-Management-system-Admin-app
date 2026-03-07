const Transaction = require('../models/Transaction');
const Student = require('../models/Student');
const { transactionDTO } = require('../dtos');

exports.createTransaction = async (data) => {
  const transaction = await Transaction.create(data);
  return transactionDTO(transaction);
};

exports.getAllTransactions = async () => {
  const transactions = await Transaction.find().populate('studentId');
  return transactions.map(transactionDTO);
};

exports.getTransactionsByStudent = async (studentId) => {
  const transactions = await Transaction.find({ studentId });
  return transactions.map(transactionDTO);
};

exports.approveTransaction = async (id) => {
  const transaction = await Transaction.findById(id);
  if (!transaction) throw new Error('Transaction not found');

  const student = await Student.findById(transaction.studentId);
  if (!student) throw new Error('Student not found');

  if (transaction.type === 'deposit') {
    student.feeBalance += transaction.amount;
  } else if (transaction.type === 'withdraw') {
    if (student.feeBalance < transaction.amount) {
      throw new Error('Insufficient balance');
    }
    student.feeBalance -= transaction.amount;
  }

  transaction.status = 'approved';
  await transaction.save();
  await student.save();

  return transactionDTO(transaction);
};

exports.rejectTransaction = async (id) => {
  const transaction = await Transaction.findById(id);
  if (!transaction) throw new Error('Transaction not found');
  
  transaction.status = 'rejected';
  await transaction.save();
  return transactionDTO(transaction);
};
