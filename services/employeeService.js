const Employee = require('../models/Employee');


exports.getAll = () => Employee.find().populate('ownerTasks').populate('tasks');

exports.getOne = (id) => Employee.findById(id).populate('ownerTasks').populate('tasks');

exports.create = (data) => Employee.create(data);

exports.update = (id, body) => Employee.updateOne({_id: id}, {$set: body}, {runValidators: true});

exports.deleteOne = (id) => Employee.deleteOne({_id: id});
