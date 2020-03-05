const express = require('express'),
  bcrypt = require('bcryptjs'),
  router = express.Router();

const User = require('../models/users');

/* GET users listing. */
router.get('/signup', function(req, res, next) {
  res.render('template', {
    locals: {
      title: 'User Sign Up'
    },
    partials: {
      partial: 'partial-signup'
    }
  });
});

router.get('/login', function(req, res, next) {
  res.render('template', {
    locals: {
      title: 'User Login'
    },
    partials: {
      partial: 'partial-login'
    }
  });
});

module.exports = router;
