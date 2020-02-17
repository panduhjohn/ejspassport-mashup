const chalk = require('chalk');
const express = require('express');
const app = express();
const logger = require('morgan');
const path = require('path');
const fetch = require('node-fetch');
const axios = require('axios');

require('dotenv').config();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.render('main/home');
});
app.get('/movies', (req, res) => {
    res.render('main/movies');
});
app.get('/random', (req, res) => {
    const url = 'https://randomuser.me/api/?results=1';
    axios(url).then(results => console.log(results.data));
    res.render('main/random');
});

app.listen(port, () => {
    console.log(chalk.blue(`App listening on port ${port}`));
});
