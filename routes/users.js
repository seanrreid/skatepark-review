const express = require('express'),
    bcrypt = require('bcryptjs'),
    router = express.Router();

const User = require('../models/users');

/* GET users listing. */
router.get('/signup', function(req, res, next) {
  res.render('template', {
    locals: {
        title: 'User Sign Up',
        is_logged_in: req.session.is_logged_in,
        first_name: req.session.first_name
    },
    partials: {
        partial: 'partial-signup'
    }
  });
});

router.get('/login', function(req, res, next) {
  res.render('template', {
    locals: {
        title: 'User Login',
        is_logged_in: req.session.is_logged_in,
        first_name: req.session.first_name
    },
    partials: {
        partial: 'partial-login'
    }
  });
});

router.post('/signup', (req, res) =>{
  const email = req.body.email;
  const firstName = req.body.first_name;
  const lastName = req.body.last_name;
  
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  const user = new User(null, firstName, lastName, email, hash);

  user.save().then(() => {
    res.redirect('/');
  });
});

router.post('/login', (req, res) => {
  // Create a new instance of User.
  // we don't want to login all users, 
  // just a single instance of a user.

  // We only have the email and password, 
  // so we pass the other values as null
  const user = new User(null, null, null, req.body.email, req.body.password);

  // Call the user instance login() method in the User model...
  user.login().then(response => {
    console.log("response is", response);
    if(response.isValid === true) {
       // If we're a valid user then go to the home page
      req.session.is_logged_in = true;
      req.session.user_id = response.user_id;
      req.session.first_name = response.first_name;
      req.session.last_name = response.last_name;
      res.redirect('/');
    } else {
       // If we're NOTE valid user then go to the signup page
      res.sendStatus(401)
      //res.redirect('/users/signup');
    }
  })
  
});

module.exports = router;
