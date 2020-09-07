const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const cors = require('cors');

//CONFIG
const keys = require('./config/keys');
const passportSetup = require('./config/passport');

//Express MODULES in use.
app.use(morgan('dev'));
app.use(cookieSession({ maxAge: 24 * 60 *60 * 1000, keys: [keys.session.cookieKey]}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

//Import ROUTES
const index = require('./routes/index.js');
const login = require('./routes/login.js');
const dashboard = require('./routes/dashboard.js');
const logout = require('./routes/logout.js');

//Use routes
app.use(index);
app.use(login);
app.use(dashboard);
app.use(logout);

//PROXY PORT
const PORT = process.env.PORT || 3001; 
app.listen(PORT, console.log(`Server is starting at ${PORT}`));

//URI to connect to MongoDB
mongoose.Promise = global.Promise;

mongoose.connect(keys.mongoDB.dbURI);

mongoose.connection.on('error', function(err) {
	console.log('Connection to Mongo established.');
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});
mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database");
})

// CATCH 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// ERROR handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // error page
  res.status(err.status || 500);
  res.json(err.message);
});

module.exports = app;

