const Employee = require('../models/Employee');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');

async function register(fullName ,email, password, phoneNumber, dateOfBirth, salary) {
    const user = await Employee.findOne({ email }).collation({ locale: 'en', strength: 2});

    if(user) {
        throw ('This email alredy exist!');
    };

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Employee.create({
        fullName,
        email, 
        password: hashedPassword, 
        phoneNumber, 
        dateOfBirth, 
        salary
    });

    return newUser;
};

async function login(email, password) {
    
    const user = await Employee.findOne({ email }).collation({ locale: 'en', strength: 2});
    if(!user) {
        throw ('Cannot find email or password');
    };
    const isValidPass = await bcrypt.compare(password, user.password);
    if(!isValidPass) {
        throw ('Cannot find email or password');
    };
    return user;
};


function createSession({ _id, fullName, email}) {
    const payload = {
       _id,
       fullName,
       email
   };

   const token = jwt.sign(payload, JWT_SECRET);
   return token;
};

module.exports = {
    register,
    login,
    createSession
};