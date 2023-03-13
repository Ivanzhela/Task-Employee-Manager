const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: [true, "Name is required!"], minlength: [2 , 'Name must be at least 2 characters long!']},
    description: { type: String, required: [true, "Description is required!"], minlength: [5 , 'Description should be at least 5 and no longer than 50 characters!'], maxlength: [50, 'Description should be at least 5 and no longer than 50 characters!']},
    dueDate: { type: String, required: [true, "Due Date is required!"] },
    createdOn: {type: String},
    status: { type: String },
    asignee: { type: mongoose.Types.ObjectId, ref: 'Employee'},
    owner: { type: mongoose.Types.ObjectId, ref: 'Employee'},
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;