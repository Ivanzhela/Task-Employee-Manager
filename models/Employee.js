const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    fullName: { type: String, required: [true, 'Full Name is required!'], minlength: [5 , 'Full Name must be at least 5 characters long!'] },
    email: { type: String, required: [true, 'Email is required!'], minlength: [8 , 'Email must be at least 8 characters long!'] },
    password: { type: String, required: [true, 'Password is required!'], minlength: [4 , 'Password must be at least 4 characters long!' ] },
    phoneNumber: { type: String, required: [true, 'Phone Number is required!'], minlength: [10 , 'Phone Number must be at least 10 characters long!'] },
    dateOfBirth: { type: String, required: [true, 'Date of Birth is required!'], minlength: [10 , 'Date of birth must be at least 10 characters long!'] },
    salary: { type: Number, required: [true, 'Monthly salary is required!'], min: [1 , 'Monthly salary must be positive number!'] },
    tasks: [{type: mongoose.Types.ObjectId, ref: 'Task'}],
    ownerTasks: [{type: mongoose.Types.ObjectId, ref: 'Task'}]
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;