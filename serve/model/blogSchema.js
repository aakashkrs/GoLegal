const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    content: String,
    tags: [String],
    publish: Boolean,
    image: String,
    publishDate: { type: Date, default: Date.now } // Default to current date
  });

const Blog = mongoose.model('Blog', blogSchema);
// console.log(Grievances);
module.exports = Blog;