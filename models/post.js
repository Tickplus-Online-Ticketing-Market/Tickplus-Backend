const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: String,
  body: String,

});

const Post = mongoose.model("Post", noteSchema);

module.exports = Post;
