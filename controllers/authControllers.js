const router = require('express').Router();
const { COOKIE_SESSION_NAME } = require('../config/env');
const { parseError } = require('../util/parser');
const { register, login, createSession } = require('../services/authService');
const { isUser, isGuest} = require('../middlewares/authMiddleware');


router.get('/login', isGuest, (req, res) => {
    res.render('auth/login');
});

router.post('/login', isGuest, async (req, res) => {
    const { email, password } = req.body;

    try {
        if (email == '' || password == '') {
            throw new Error('All fields are required');
        };
        const user = await login(email, password);
        const token = createSession(user);
        res.cookie('user', token, { httpOnly: true });

        res.redirect('/');
    } catch (error) {

        res.render('auth/login', {
            error
        });
    };
});

router.get('/register', isGuest, (req, res) => {
    res.render('auth/register');
});

router.post('/register', isGuest, async (req, res) => {
    const { fullName ,email, password, rePass, phoneNumber, dateOfBirth, salary } = req.body;

    try {
        if (fullName == "" || email == "" || password == "" || rePass == "" || phoneNumber == "" || dateOfBirth == "" || salary == "") {
            throw new Error('All fields are required');
        };

        if (password != rePass) {
            throw new Error('Passwords don`t match');
        };
        
        const user = await register(fullName ,email, password, phoneNumber, dateOfBirth, salary);
        const token = createSession(user);
        res.cookie(COOKIE_SESSION_NAME, token, { httpOnly: true });

        res.redirect('/');

    } catch (err) {

        const error = parseError(err);
        res.render('auth/register', {
            error
        });
    };
});

router.get('/logout', isUser, (req, res) => {
    res.clearCookie('user');
    res.redirect('/');
});

module.exports = router;