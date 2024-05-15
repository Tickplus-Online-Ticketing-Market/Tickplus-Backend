const Post = require("../../models/post");

//routing
const fetchPosts = async (req, res) => {
  const posts = await Post.find();

  res.json({ posts: posts });
};

const fetchPost = async (req, res) => {
  const postId = req.params.id;

  const post = await Post.findById(postId);

  res.json({ post: post });
};

//create
const createPost = async (req, res) => {
  const title = req.body.title;
  const body = req.body.body;

  const post = await Post.create({
    title: title,
    body: body
  
  });

 
  res.json({post:post})
};

//update
const updatePost = async (req, res) => {
  const postId = req.params.id;

  const title = req.body.title;
  const body = req.body.body;

  await Post.findByIdAndUpdate(postId, {
    title: title,
    body: body,
  });

  const post = await Post.findById(postId);

  res.json({ post: post });
};

//delete
const deletePost = async (req, res) => {
  const postId = req.params.id;

  await Post.deleteOne({ _id: postId });

  res.json({ sucess: "Record deleted" });
};

module.exports = {
  fetchPosts,
  fetchPost,
  createPost,
  updatePost,
  deletePost,
};
