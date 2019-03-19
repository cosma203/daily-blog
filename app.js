// jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const { BlogPost } = require('./model/blogPost');
const {
  aboutContent,
  contactContent,
  homeStartingContent
} = require('./pageContent');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

require('./startup/db')();

// route /
app.route('/').get(async (req, res) => {
  res.render('home', { homeStartingContent, posts: await BlogPost.find({}) });
});

// route /about
app.route('/about').get((req, res) => {
  res.render('about', { aboutContent });
});

// route /contact
app.route('/contact').get((req, res) => {
  res.render('contact', { contactContent });
});

// route /compose
app
  .route('/compose')
  .get((req, res) => {
    res.render('compose');
  })
  .post(async (req, res) => {
    const { postTitle, postBody } = req.body;

    await BlogPost.create({ title: postTitle, content: postBody });

    res.redirect('/');
  });

// route /posts/:title
app.route('/posts/:postName').get(async (req, res) => {
  const { postName } = req.params;
  const blogPost = await BlogPost.findOne({ title: postName });

  res.render('post', { post: blogPost });
});

app.listen(3000, function() {
  console.log('Listening on port 3000...');
});
