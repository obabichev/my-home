const Transaction = require('../models/Transaction.js');
const Wallet = require('../models/Wallet.js');

async function createTransaction(body) {
  const transaction = await Transaction.create(body);
  await addToWalletTotal(transaction.walletId, transaction.amount);
  return transaction;
}

async function updateTransaction(body) {
  const transaction = await Transaction.findOne({_id: body._id});
  const diff = body.amount - transaction.amount;
  await addToWalletTotal(transaction.walletId, diff);
  await Transaction.findOneAndUpdate({_id: transaction._id}, body);
  return Transaction.findOne({_id: transaction._id});

}

async function deleteTransaction(transactionId) {
  const transaction = await Transaction.findOne({_id: transactionId});
  await addToWalletTotal(transaction.walletId, -transaction.amount);
  return await Transaction.findByIdAndRemove(transactionId);
}

const addToWalletTotal = async (walletId, amount) => {
  const wallet = await Wallet.findOne({_id: walletId});
  wallet.total = wallet.total + amount;
  return await Wallet.findByIdAndUpdate(wallet._id, wallet);
};

module.exports = {
  createTransaction,
  updateTransaction,
  deleteTransaction
};
