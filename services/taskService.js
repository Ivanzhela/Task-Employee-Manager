const Task = require('../models/Task');


exports.getAll = () => Task.find().populate('owner').populate('asignee');

exports.getOne = (id) => Task.findById(id).populate('owner').populate('asignee');

exports.create = (data) => Task.create(data);

exports.update = (id, body) => Task.updateOne({_id: id}, {$set: body}, {runValidators: true});

exports.deleteOne = (id) => Task.deleteOne({_id: id});

