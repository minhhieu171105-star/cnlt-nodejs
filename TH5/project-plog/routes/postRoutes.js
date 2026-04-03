const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");

router.get("/", postController.getAllPosts);

router.get("/post/new", postController.getCreatePost);
router.post("/post/store", postController.createPost);

router.get("/post/:id", postController.getPostDetail);

router.get("/post/edit/:id", postController.getEditPost);
router.post("/post/update/:id", postController.updatePost);

router.get("/post/delete/:id", postController.deletePost);

module.exports = router;