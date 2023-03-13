const router = require('express').Router();
const { isUser, isEmployee } = require('../middlewares/authMiddleware');
const { create, getAll, getOne, update, deleteOne } = require('../services/employeeService');
const { parseError } = require('../util/parser');

router.get('/list', async (req, res) => {
    const employees = await getAll().lean();
    employees.map(a => a._id == req.user?._id ? a.isAuth = true : a.isAuth = '');

    res.render('employees/list', { employees });
});

router.get('/details/:id', async (req, res) => {
    const employee = await getOne(req.params.id).lean();
    const isEmployee = employee._id == req.user?._id;

    res.render('employees/details', { ...employee, isEmployee});
});

router.get('/edit/:id', isUser, isEmployee, async (req, res) => {
    const employee = await getOne(req.params.id).lean();
    res.render('employees/edit', { ...employee });
});

router.post('/edit/:id', isUser, isEmployee, async (req, res) => {
    
    try {
        await update(req.params.id, req.body);
        res.redirect(`/employees/details/${req.params.id}`);

    } catch (err) {
        const error = parseError(err);
        res.render(`employees/edit`, {
            error
        });
    };
});

router.get('/delete/:id', isUser, isEmployee, async (req, res) => {
    
    await deleteOne(req.params.id);
    res.clearCookie('user');
    res.redirect('/tasks/list');
});


module.exports = router;