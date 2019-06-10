module.exports = function(app, express, passport) {
  const router = express.Router();
  const bcrypt = require('bcryptjs');
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
    passport.authenticate('github');
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

  router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user) => {
      if (err) { 
        return next(err); 
      }
      if (!user) { 
        return res.redirect('/users/login'); 
      }
      if (!!user) {
        req.session.is_logged_in = true;
        req.session.user_id = user.user_id;
        req.session.first_name = user.first_name;
        req.session.last_name = user.last_name;
        res.redirect('/');
      }
    })(req, res, next);
  });

  router.get('/login/github',
    passport.authenticate('github'));

  router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
  });

  return router;
}
//module.exports = router;
