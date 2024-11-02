const express = require('express');
const morgan = require('morgan');
const mongodb = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
require('dotenv').config();

// get environment variables
const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;

// express app
const app = express();

// connect to mongodb
const dbURI = `mongodb+srv://${db_username}:${db_password}@nodetut.upy0n.mongodb.net/node-tut?retryWrites=true&w=majority&appName=NodeTut`;
mongodb.connect(dbURI)
 .then((result) => app.listen(3000))
 .catch((err) => console.error(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  // res.send('<p>home page</p>');
  res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});