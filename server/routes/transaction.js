const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Transaction = require('../models/Transaction.js');
const Wallet = require('../models/Wallet.js');
const authValidator = require('../authValidator');

const TransactionController = require('../controllers/TransactionController');

/* GET ALL TRANSACTIONS */
router.get('/', authValidator, function (req, res, next) {
  const userId = req.payload._id;
  Transaction.find()
    .where('userId').equals(userId)
    .then(transactions => {
      res.json(transactions);
    })
    .catch(err => next(err));
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
  const userId = req.payload._id;
  req.body.userId = userId;
  return TransactionController.createTransaction(req.body)
    .then(transaction => res.json(transaction))
    .catch(err => next(err));
});

/* UPDATE TRANSACTION */
router.put('/', authValidator, function (req, res, next) {
  return TransactionController.updateTransaction(req.body)
    .then(transaction => res.json(transaction))
    .catch(err => next(err));
});

/* DELETE TRANSACTION */
router.delete('/:id', authValidator, function (req, res, next) {
  return TransactionController.deleteTransaction(req.params.id)
    .then(result => res.json(result))
    .catch(err => next(err));
});

module.exports = router;
