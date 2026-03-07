const transactionService = require('../services/transactionService');

exports.createTransaction = async (req, res) => {
  try {
    const transaction = await transactionService.createTransaction(req.body);
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await transactionService.getAllTransactions();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTransactionsByStudent = async (req, res) => {
  try {
    const transactions = await transactionService.getTransactionsByStudent(req.params.studentId);
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.approveTransaction = async (req, res) => {
  try {
    const transaction = await transactionService.approveTransaction(req.params.id);
    res.json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.rejectTransaction = async (req, res) => {
  try {
    const transaction = await transactionService.rejectTransaction(req.params.id);
    res.json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
