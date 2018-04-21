const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  // id: Number,
  amount: Number,
  date: {type: Date, default: Date.now},
  type: String
});

module.exports = mongoose.model('Transaction', TransactionSchema);
