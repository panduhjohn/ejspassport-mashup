const chalk = require('chalk');
const express = require('express');
const app = express();
const logger = require('morgan');
const path = require('path');
const fetch = require('node-fetch');

require('dotenv').config();

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const port = process.env.PORT || 3000;

app.get('/movies', (req, res) => {
    const key = process.env.MOVIE_API;
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`;
    const img = 'https://image.tmdb.org/t/p/w500';

    fetch(url + key)
        .then(res => res.json())
        .then(data => {
            res.render('main/movies', { data, img });
        })
        .catch(err => console.log('Error in movies', err));
});

app.get('/random', (req, res) => {
    const url = 'https://randomuser.me/api/?results=20';
    fetch(url)
        .then(res => res.json())
        .then(users => {
            // const sortUsers = users.results.sort((a,b) => a + b)
            const sortUsers = users.results.sort((a, b) => {
                if (b.name.last > a.name.last) return -1;
                else if (a.name.last > b.name.last) return 1;
                else return 0;
            });
            res.render('main/random', { sortUsers });
        })
        .catch(err => console.log('Error in Random', err));
});

app.listen(port, () => {
    console.log(chalk.blue(`App listening on port ${port}`));
});
