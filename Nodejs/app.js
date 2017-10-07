var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/ethGP';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected correctly to server");
});


var index = require('./routes/index');
var users = require('./routes/users');
var accountRouter = require('./routes/accountRouter');
var reservationMakeRouter = require('./routes/makeReservationRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/accounts', accountRouter);
app.use('/reservation/make', reservationMakeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

Web3        = require('web3'),
contract    = require("truffle-contract"),
path        = require('path')
MetaCoin    = require(path.join(__dirname, '../build/contracts/MetaCoin.json'));


var provider    = new Web3.providers.HttpProvider("http://localhost:8545"),    
filePath    = path.join(__dirname, '../../build/contracts/MetaCoin.json');

MetaCoinContract = contract(MetaCoin);
MetaCoinContract.setProvider(provider);

module.exports = app;
