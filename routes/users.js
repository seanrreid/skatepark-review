const express = require('express'),
    bcrypt = require('bcryptjs'),
    router = express.Router();

const User = require('../models/users');

/* GET users listing. */
router.get('/signup', function(req, res, next) {
  res.render('template', {
    locals: {
        title: 'User Sign Up',
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

router.post('/login', (req, res) =>{
  const user = new User(null, null, null, req.body.email, req.body.password);

  user.login().then(response => {
    console.log("login response", response);
  })
  
});

module.exports = router;
