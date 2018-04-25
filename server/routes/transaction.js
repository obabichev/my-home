const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Transaction = require('../models/Transaction.js');
const Wallet = require('../models/Wallet.js');

/* GET ALL TRANSACTIONS */
router.get('/', function (req, res, next) {
  Transaction.find(function (err, transactions) {
    if (err) return next(err);
    res.json(transactions);
  });
});

/* GET SINGLE TRANSACTION BY ID */
router.get('/:id', function (req, res, next) {
  Transaction.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE TRANSACTION */
router.post('/', function (req, res, next) {
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
router.put('/:id', function (req, res, next) {
  Transaction.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE TRANSACTION */
router.delete('/:id', function (req, res, next) {
  Transaction.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
