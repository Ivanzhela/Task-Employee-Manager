const jwt = require('jsonwebtoken');
const { COOKIE_SESSION_NAME, JWT_SECRET } = require("../config/env");
const taskService = require('../services/taskService');
const employeeService = require('../services/employeeService');

exports.auth = (req, res, next) => {
    const token = req.cookies[COOKIE_SESSION_NAME];
    if(token) {
        jwt.verify(token, JWT_SECRET, ((err, decodedToken) => {
            if(err) {
                res.clearCookie(COOKIE_SESSION_NAME);
                return res.redirect('/auth/login');
            };

            req.user = decodedToken;
            res.locals.user = decodedToken;
            next();
        }));
    } else {
        next();
    };
};

exports.isUser = (req, res, next) => {
    if(!req.user) {
        return res.render('404');
    };

    next();
};

exports.isGuest = (req, res, next) => {
    if(req.user) {
        return res.render('404');
    };

    next();
};

exports.isCreator = async (req, res, next) => {
    const task = await taskService.getOne(req.params.id);
    const isAuthor = task.owner._id == req.user?._id;
    
    if (!isAuthor) {
        return res.render('404');
    };
    req.task = task;

    next();
};

exports.isEmployee = async (req, res, next) => {
    const employee = await employeeService.getOne(req.params.id);
    const isEmployee = employee._id == req.user?._id;
    
    if (!isEmployee) {
        return res.render('404');
    };
    req.employee = employee;

    next();
};