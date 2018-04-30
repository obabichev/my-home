var express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');

const transaction = require('./routes/transaction');
const wallet = require('./routes/wallet');
const auth = require('./routes/auth');
const user = require('./routes/user');
const app = express();

const dataURL = process.env.MONGODB_URI;

const mongoose = require('mongoose');
const passport = require('passport');
require('./config/passport');

mongoose.Promise = require('bluebird');
mongoose
  .connect(dataURL || 'mongodb://localhost:27017/test', {promiseLibrary: require('bluebird')})
  .then(() => console.log('connection succesful'))
  .catch((err) => console.error(err));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': 'false'}));

app.use(express.static(path.join(__dirname, '../dist')));
app.use(passport.initialize());
app.use('/api/auth', auth);
app.use('/api/user', user);
app.use('/api/transaction', transaction);
app.use('/api/wallet', wallet);
app.use('/*', express.static(path.join(__dirname, '../dist')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
