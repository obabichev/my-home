const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Wallet = require('../models/Wallet.js');

/* GET ALL WALLETS */
router.get('/', function (req, res, next) {
  Wallet.find(function (err, transactions) {
    if (err) return next(err);
    res.json(transactions);
  });
});

/* GET SINGLE WALLET BY ID */
router.get('/:id', function (req, res, next) {
  Wallet.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE WALLET */
router.post('/', function (req, res, next) {
  Wallet.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE WALLET */
router.put('/:id', function (req, res, next) {
  Wallet.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE WALLET */
router.delete('/:id', function (req, res, next) {
  Wallet.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
