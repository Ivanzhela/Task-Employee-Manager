const router = require('express').Router();
const { isUser, isCreator } = require('../middlewares/authMiddleware');
const { create, getAll, getOne, update, deleteOne } = require('../services/taskService');
const employeeService = require('../services/employeeService');
const { parseError } = require('../util/parser');

router.get('/list', async (req, res) => {

    try {
        const tasksForUpdate = await getAll();
        tasksForUpdate.map(t => new Date(t.dueDate) <= new Date() && t.status != "Completed" ? t.status = "Expired" : t.status);
        tasksForUpdate.forEach(async (u) => await u.save());

        const tasks = await getAll().lean();
        const user = typeof req.user === "object";
        tasks.map(t => t.owner?._id == req.user?._id && typeof req.user == "object" ? t.isAuth = true : t.isAuth = false);
        tasks.map(t => t.status != "Not Started" && t.asignee?._id != req.user?._id || t.status == "Completed" || req.user?._id == undefined ? t.isDisable = true : t.isDisable = false);

        res.render('tasks/list', { tasks, user });

    } catch (err) {
        const error = parseError(err);
        res.render('tasks/list', {
            error
        })
    };
});


router.get('/create', isUser, (req, res) => {
    res.render('tasks/create');
});

router.post('/create', isUser, async (req, res) => {

    try {
        const createdOn = new Date().toDateString();
        const currDueDate = new Date(req.body.dueDate);

        if (createdOn >= currDueDate) {
            throw new Error("Invalid Due date!");
        };
        const task = await create({ ...req.body, owner: req.user._id, createdOn, status: "Not Started" });
        const employee = await employeeService.getOne(req.user._id);
        employee.ownerTasks.push(task._id);
        await employee.save();
        res.redirect('/tasks/list');
    } catch (err) {
        const error = parseError(err);
        res.render('tasks/create', {
            error
        })
    }
});

router.get('/details/:id', async (req, res) => {

    try {
        const task = await getOne(req.params.id).lean();
        const isCreator = task.owner?._id == req.user?._id;
        res.render('tasks/details', { ...task, isCreator });
    } catch (err) {
        const error = parseError(err);
        res.render(`tasks/details/${req.params.id}`, {
            error
        });
    };
});

router.get('/edit/:id', isCreator, async (req, res) => {

    try {
        const task = await getOne(req.params.id).lean();
        res.render('tasks/edit', { ...task });
    } catch (err) {
        const error = parseError(err);
        res.render(`tasks/details/${req.params.id}`, {
            error
        });
    };
});

router.post('/edit/:id', isCreator, async (req, res) => {

    try {
        await update(req.params.id, req.body);
        res.redirect(`/tasks/details/${req.params.id}`);

    } catch (err) {
        const error = parseError(err);
        res.render(`tasks/edit/${req.params.id}`, {
            error
        });
    };
});

router.get('/delete/:id', isCreator, async (req, res) => {

    await deleteOne(req.params.id);
    res.redirect('/tasks/list');
});


router.get('/status/:id', isUser, async (req, res) => {

    try {
        const task = await getOne(req.params.id);
        const employee = await employeeService.getOne(req.user._id);

        if (task.status == "Not Started") {
            employee.tasks.push(req.params.id);
            task.asignee = employee._id;
            task.status = "In Progress";

            await employee.save();
            await task.save();

        } else if (task.status == "In Progress") {
            task.status = "Completed";
            await task.save();
        }

        res.redirect('/tasks/list');

    } catch (err) {
        const error = parseError(err);
        res.render(`tasks/edit`, {
            error
        });
    }
});

module.exports = router;