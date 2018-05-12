const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Wallet = require('../models/Wallet.js');
const authValidator = require('../authValidator');

const WalletController = require('../controllers/WalletController');

/* GET ALL WALLETS */
router.get('/', authValidator, function (req, res, next) {
  const userId = req.payload._id;
  Wallet.find()
    .where('userId').equals(userId)
    .exec(function (err, transactions) {
      if (err) return next(err);
      res.json(transactions);
    });
});

/* GET SINGLE WALLET BY ID */
router.get('/:id', authValidator, function (req, res, next) {
  Wallet.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE WALLET */
router.post('/', authValidator, function (req, res, next) {
  const userId = req.payload._id;
  req.body.userId = userId;
  Wallet.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE WALLET */
router.put('/:id', authValidator, function (req, res, next) {
  WalletController.updateWallet(req.body)
    .then(result => res.json(result))
    .catch(err => next(err));
});

/* DELETE WALLET */
router.delete('/:id', authValidator, function (req, res, next) {
  Wallet.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
