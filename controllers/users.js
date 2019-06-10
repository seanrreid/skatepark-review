const bcrypt = require('bcryptjs'),
    User = require('../models/users');

exports.sign_up_get = (req, res) => {
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
}

exports.sign_up_post = (req, res) => {
    const { email, first_name, last_name } = req.body;

    // Salt the hash!
    const salt = bcrypt.genSaltSync(10),
        hash = bcrypt.hashSync(req.body.password, salt);

    // Create a new user!
    const user = new User(null, first_name, last_name, email, hash);

    user.save().then(() => {
        res.redirect('/');
    });
}

exports.login_get = (req, res) => {
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
}

exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    
    // Get a single user via our User model
    const userInstance = new User(null, null, null, email, password);
    const user = await userInstance.getUserByEmail();

    // Is our password valid?
    const valid = bcrypt.compareSync(password, user.password);
    
    if (!!valid) {
        req.session.is_logged_in = true;
        req.session.user_id = user.id
        req.session.first_name = user.first_name;
        req.session.last_name = user.last_name;
        res.redirect('/');
    } else {
        res.sendStatus(401)
    }
}

exports.logout_get = (req, res) => {
    req.session.destroy();
    res.redirect('/');
}