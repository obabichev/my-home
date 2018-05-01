const mongoose = require('mongoose');

const WalletSchema = new mongoose.Schema({
  name: String,
  userId: String,
  description: String,
  currency: {
    code: String,
    value: String
  },
  total: {type: Number, default: 0}
});

module.exports = mongoose.model('Wallet', WalletSchema);
