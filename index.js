const express = require('express');
const hbs = require('express-handlebars');
const cookieParser = require('cookie-parser');

const { initDB } = require('./config/initDB');
const { PORT } = require('./config/env');
const routes = require('./routes');
const { auth } = require('./middlewares/authMiddleware');

const app = express();

app.engine('hbs', hbs.engine({ extname: 'hbs'}));
app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: false}));
app.use(express.static('public'));
app.use(cookieParser());
app.use(auth);
app.use(routes);
initDB();

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));