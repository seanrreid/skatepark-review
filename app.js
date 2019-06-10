const express = require('express'),
    session = require('express-session'),
    passport = require('passport'),
    es6Renderer = require('express-es6-template-engine'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan');

const app = express();

// Define the ES6 Render Templates as our template engine
app.engine('html', es6Renderer);
app.set('views', './views');
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'get rad',
    resave: false,
    saveUninitialized: true,
    is_logged_in: false
}));

// Initialize Passport.js
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// Define our routes...
const indexRouter = require('./routes/index'),
    parkRouter = require('./routes/parks'),
    usersRouter = require('./routes/users')(app, express, passport);

// Tell the app what to do with the route files...
app.use('/', indexRouter);
app.use('/parks', parkRouter);
app.use('/users', usersRouter);

module.exports = app;
