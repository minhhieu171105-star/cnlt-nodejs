const BlogPost = require("../models/BlogPost");

// hiển thị danh sách
exports.getAllPosts = async (req, res) => {

  const posts = await BlogPost.find(query).sort({ createdAt: -1 });

  res.render("index", { posts, search });
};

// form tạo bài
exports.getCreatePost = (req, res) => {
  res.render("create");
};

// tạo bài
exports.createPost = async (req, res) => {
  const { title, body } = req.body;

  await BlogPost.create({
    title,
    body,
  });

  res.redirect("/");
};

// xem chi tiết
exports.getPostDetail = async (req, res) => {
  const post = await BlogPost.findById(req.params.id);

  res.render("detail", { post });
};

// form sửa
exports.getEditPost = async (req, res) => {
  const post = await BlogPost.findById(req.params.id);

  res.render("edit", { post });
};

// cập nhật
exports.updatePost = async (req, res) => {
  const { title, body } = req.body;

  await BlogPost.findByIdAndUpdate(req.params.id, {
    title,
    body,
  });

  res.redirect("/");
};

// xóa
exports.deletePost = async (req, res) => {
  await BlogPost.findByIdAndDelete(req.params.id);

  res.redirect("/");
};
