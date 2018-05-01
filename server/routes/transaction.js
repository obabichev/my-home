const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Transaction = require('../models/Transaction.js');
const Wallet = require('../models/Wallet.js');
const authValidator = require('../authValidator');

/* GET ALL TRANSACTIONS */
router.get('/', function (req, res, next) {
  Transaction.find(function (err, transactions) {
    if (err) return next(err);
    res.json(transactions);
  });
});

/* GET SINGLE TRANSACTION BY ID */
router.get('/:id', authValidator, function (req, res, next) {
  Transaction.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE TRANSACTION */
router.post('/', authValidator, function (req, res, next) {
  Transaction.create(req.body, function (err, post) {
    if (err) return next(err);
    Wallet.find({_id: post.walletId}).exec((err, wallets) => {
      if (err) return next(err);
      const wallet = wallets[0];
      wallet.total += post.amount;
      Wallet.findByIdAndUpdate(wallet._id, wallet, (err) => {
        if (err) return next(err);
        res.json(post);
      });
    });
  });
});

/* UPDATE TRANSACTION */
router.put('/:id', authValidator, function (req, res, next) {
  Transaction.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE TRANSACTION */
router.delete('/:id', authValidator, function (req, res, next) {
  Transaction.findOne({_id: req.params.id}).exec((err, transaction) => {
    if (err) return next(err);
    const amount = transaction.amount;
    const walletId = transaction.walletId;
    Wallet.findOne({_id: walletId}).exec((err, wallet) => {
      if (err) return next(err);
      wallet.total -= amount;
      Wallet.findByIdAndUpdate(wallet._id, wallet, (err) => {
        if (err) return next(err);
        Transaction.findByIdAndRemove(req.params.id, req.body, function (err, post) {
          if (err) return next(err);
          res.json(post);
        });
      });
    });
  });
});

module.exports = router;
