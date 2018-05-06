const express = require('express');
const router = express.Router();
const User = require('../models/User.js');


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

  user.save(function (err) {
    if (err) {
      return next(err);
    }
    let token;
    token = user.generateJwt();
    res.status(200);
    res.json({
      "token": token
    });
  });
});

module.exports = router;
