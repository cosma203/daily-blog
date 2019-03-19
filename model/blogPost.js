const { Schema, model } = require('mongoose');

const blogPostSchema = new Schema({
  title: String,
  content: String
});

const BlogPost = model('post', blogPostSchema);

module.exports = {
  BlogPost
};
