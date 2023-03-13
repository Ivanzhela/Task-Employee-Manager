const router = require('express').Router();
const homeController = require('./controllers/homeController');
const authControllers = require('./controllers/authControllers');
const taskControllers = require('./controllers/taskControllers');
const employeeControllers = require('./controllers/employeeControllers');
const { notFound } = require('./controllers/notFound');

router.use('/', homeController);
router.use('/auth', authControllers);
router.use('/tasks',taskControllers);
router.use('/employees',employeeControllers);
router.use('*', notFound);

module.exports = router;