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
    const key = process.env.MOVIE_API;
    // const url = `https://api.themoviedb.org/3/movie/popular/?api_key=${key}`;
    const url2 = `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`;
    axios(url2 + key)
        .then(results => console.log(results.data))
        .catch(err => console.log('Error in movies', err));
    res.render('main/movies');
});

app.get('/random', (req, res) => {
    const url = 'https://randomuser.me/api/?results=5';
    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log('Error in Random Call', err));
    res.render('main/random', {data});
});

app.listen(port, () => {
    console.log(chalk.blue(`App listening on port ${port}`));
});
