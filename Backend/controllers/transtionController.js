const Transaction = require('../models/transtionModel');

// Get all transactions
exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate('order');
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single transaction
exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id).populate('order');
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.status(200).json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new transaction
exports.createTransaction = async (req, res) => {
  const { order, paymentMethod } = req.body;
  try {
    const transaction = new Transaction({ order, paymentMethod });
    const newTransaction = await transaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a transaction
exports.updateTransaction = async (req, res) => {
  const { paymentMethod, paymentStatus } = req.body;
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { paymentMethod, paymentStatus },
      { new: true }
    ).populate('order');
    if (!updatedTransaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.status(200).json(updatedTransaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id).populate('order');
    if (!deletedTransaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.status(200).json(deletedTransaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
