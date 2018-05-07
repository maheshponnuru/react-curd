var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var book = require('./routes/book');


var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'build')));

app.use('/api/book', book);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var uri = 'mongodb://localhost:27017/crud';
var options = {
	user: '',
	pass: ''
}
mongoose.connect(uri, options);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
//mongoose.set('debug', true);
db.on('error', console.error.bind(console, 'database connection error:'));
db.once('open', function (callback) {
	console.log('Database connection successful!');
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

module.exports = app;