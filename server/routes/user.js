const express = require('express');
const router = express.Router();
const User = require('../models/User.js');

const UserController = require('../controllers/UserController');

router.get('/', function (req, res, next) {
  User.find(function (err, transactions) {
    if (err) return next(err);
    res.json(transactions);
  });
});

router.post('/', function (req, res, next) {
  const user = new User();

  user.name = req.body.name;
  user.email = req.body.email;

  user.setPassword(req.body.password);

  return UserController.registerUser(req.body)
    .then(result => {
      res.status(200);
      res.json(result);
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
