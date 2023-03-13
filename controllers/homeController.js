const employeeService = require('../services/employeeService');
const taskService = require('../services/taskService');
const { parseError } = require('../util/parser');
const router = require('express').Router();

router.get('/', async (req, res) => {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    
    try {
        const topEmpl = await employeeService.getAll().lean();
        topEmpl.map(emp => emp.tasks = emp.tasks.filter(f => f.status == "Completed" && new Date(f.dueDate) >= lastMonth));
        topEmpl.map(emp => emp.tasks = emp.tasks.length);
        const sortedEmpl = topEmpl.sort((a,b) => b.tasks - a.tasks).slice(0,5);

        const extremeTasks = await taskService.getAll().lean();
        const sortedExtrTasks = extremeTasks.filter(f => f.status == "Not Started" || f.status == "In Progress").sort((a,b) => new Date(a.dueDate) - new Date(b.dueDate)).slice(0,5);
    
        res.render('home', { sortedEmpl, sortedExtrTasks});
    }  catch (err) {
        const error = parseError(err);
        res.render('home', {
            error
        })
    }
});

module.exports = router;