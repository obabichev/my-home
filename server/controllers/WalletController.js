const Wallet = require('../models/Wallet.js');

async function updateWallet(body) {
  await Wallet.findOneAndUpdate({_id: body._id}, body);
  return Wallet.findOne({_id: body._id});
}

module.exports = {
  updateWallet
};
