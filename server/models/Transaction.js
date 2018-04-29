const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  // id: Number,
  walletId: String,
  amount: Number,
  date: {type: Date, default: Date.now},
  type: String,
  description: String
});

module.exports = mongoose.model('Transaction', TransactionSchema);
