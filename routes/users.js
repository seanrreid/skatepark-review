const express = require('express'),
    router = express.Router();

const UserController = require('../controllers/users');

/* GET routes */
router.get('/signup', UserController.sign_up_get);
router.get('/login', UserController.login_get);
router.get('/logout', UserController.logout_get);

// POST Routes
router.post('/signup', UserController.sign_up_post);
router.post('/login', UserController.login_post);

module.exports = router;
