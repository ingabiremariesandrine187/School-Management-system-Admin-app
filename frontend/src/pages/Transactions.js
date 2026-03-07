import React, { useState, useEffect } from 'react';
import { transactionService } from '../services/transactionService';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await transactionService.getAll();
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await transactionService.approve(id);
      fetchTransactions();
    } catch (error) {
      alert(error.response?.data?.message || 'Error approving transaction');
    }
  };

  const handleReject = async (id) => {
    try {
      await transactionService.reject(id);
      fetchTransactions();
    } catch (error) {
      alert('Error rejecting transaction');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">
      <div className="text-xl text-gray-600">Loading...</div>
    </div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Fee Transactions</h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`font-semibold ${transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">${transaction.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold
                    ${transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${transaction.status === 'approved' ? 'bg-green-100 text-green-800' : ''}
                    ${transaction.status === 'rejected' ? 'bg-red-100 text-red-800' : ''}
                  `}>
                    {transaction.status}
                  </span>
                </td>
                <td className="px-6 py-4">{transaction.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(transaction.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {transaction.status === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(transaction.id)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition duration-200"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(transaction.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-200"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
