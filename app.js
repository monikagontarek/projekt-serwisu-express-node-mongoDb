var createError = require('http-errors');
var cookieSession = require('cookie-session');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config = require('./config');
var mongoose = require('mongoose');

mongoose.connect(config.db, { useNewUrlParser: true, });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


var indexRouter = require('./routes/index');
var newsRouter = require('./routes/news');
var quizRouter = require('./routes/quiz');
var adminRouter = require('./routes/admin');
var apiRouter = require('./routes/api');

//const pass = jxZOZKzQKBzw1GNa;
//mongodb+srv://admin:jxZOZKzQKBzw1GNa@cluster0.t9o40.mongodb.net/myFirstDatabase?retryWrites=true&w=majority


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieSession({
  name: 'session',
  keys: config.keySesion,
  maxAge: config.maxAgeSesion // 24 hours
}))

app.use(function (req, res, next) {
  res.locals.path = req.path;
  // chcemy przenieść ten req.path do naszych szablonów, tutaj nie renderujemy żadnych szablonów dlatego musimy się posłużyć globalnymi zmiennymi, dlatego ten req.path przypisujemy do res.locals.___ i wpisujemy sobie swoją nazwę pod którą będzie dostępny ten path. Dzięki temu mamy go globalnie dostęnego w naszych szablonach
  next();
  // używany next aby nam się nie zawiesił serwer, bez next zatrzymuje się na rauting i nie przechodzi dalej
})

app.use('/', indexRouter);
app.use('/news', newsRouter);
app.use('/quiz', quizRouter);
app.use('/admin', adminRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
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
