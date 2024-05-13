const express = require("express");
const router = express.Router();
const postController = require("../controllers/CommunityManagement/postController");

router.post("/posts", postController.createPost); // create
router.get("/posts/:id", postController.fetchPost); // retrieve
router.put("/posts/:id", postController.updatePost); // update
router.delete("/post/:id", postController.deletePost); // delete
router.get("/posts", postController.fetchPosts); // retrieve all

module.exports = router;
