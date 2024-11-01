const express = require('express');
const morgan = require('morgan');
const mongodb = require('mongoose');
const Blog = require('./models/blog');
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
app.use(morgan('dev'));

// mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'New Blog 2',
    snippet: 'about my new blog',
    body: 'more about my new blog'
  });

  blog.save()
    .then((result) => res.send(result))
    .catch((err) => console.error(err));
});

app.get('/all-blogs', (req, res) => {
  Blog.find()
   .then((result) => res.send(result))
   .catch((err) => console.error(err));
});

app.get('/single-blog', (req, res) => {
  Blog.findById('67250fe6aa1ca925d9273269')
   .then((result) => res.send(result))
   .catch((err) => console.error(err));
});

app.get('/', (req, res) => {
  const blogs = [
    {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  ];
  // res.send('<p>home page</p>');
  res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
  // res.send('<p>home page</p>');
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new Blog' });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});