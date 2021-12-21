var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bcrypt = require("bcrypt");
// 
var flash = require('express-flash')
var moment = require('moment');
var passport = require('passport');
// const localStategy = require("passport-local").Strategy;
var session  = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
const { Sequelize,sequelize,Admin } = require('./models');
var app = express();

app.locals.baseURL = "http://localhost:3000";
app.locals.moment = moment;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(flash());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




// For Passport
 
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
 
app.use(passport.initialize());
 
app.use(passport.session()); // persistent login sessions



// app.get('/',async(req, res) =>{
//   // await Admin.create({
//   //     email:"admin@admin.com",
//   //     password:await bcrypt.hashSync("123456",10)
//   // });
//   res.render('login', { title: 'Express' });
// });

// app.post("/",passport.authenticate("local",{failureRedirect:'/'}),async(req,res) =>{
//   console.log(req.body)
//   req.session.save(() =>{
//       res.redirect("admin/dashboard");
//   })
//   // return res.json(req.body);
// });
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin',adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log(err)
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
