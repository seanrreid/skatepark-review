const express = require('express'),
  bcrypt = require('bcryptjs'),
  UserModel = require('../models/users'),
  router = express.Router();

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

router.post('/login', function(req, res, next) {
  const { email, password } = req.body;

  const user = new UserModel(null, null, null, email, password);
  user.loginUser();
  res.sendStatus(200);
});

router.post('/signup', function(req, res, next) {
  const { first_name, last_name, password, email } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const user = new UserModel(null, first_name, last_name, email, hash);
  user.addUser();
  res.status(200).redirect('/');
});

module.exports = router;
