const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User.js');

const authValidator = require('../authValidator');

router.post('/', (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }

  passport.authenticate('local', function (err, user, info) {
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if (user) {
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token": token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);
});

router.get('/profile', authValidator, (req, res, next) => {
// If no user ID exists in the JWT return a 401
  if (!req.payload._id) {
    res.status(401).json({
      "message": "UnauthorizedError: private profile"
    });
  } else {
    // Otherwise continue
    User
      .findById(req.payload._id)
      .exec(function (err, user) {
        res.status(200).json(user);
      });
  }
});

module.exports = router;
