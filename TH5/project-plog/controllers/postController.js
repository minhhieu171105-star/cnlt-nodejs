const BlogPost = require("../models/BlogPost");

// hiển thị danh sach bai viet
exports.getAllPosts = async (req, res) => {
  // neu muon tim kiem, su dung req.query.search
  const search = req.query.search; // lay tham so search tu URL
  let filter = {};

  if (search) {
    filter.title = new RegExp(search, "i"); // tim kiem khong phan biet chu hoa/chu thuong
  }

  const posts = await BlogPost.find(filter).sort({ createdAt: -1 });

  res.render("index", { posts, search });
};

// form tao bai viet
exports.getCreatePost = (req, res) => {
  res.render("create");
};

// tao bai viet moi
exports.createPost = async (req, res) => {
  const { title, body } = req.body;

  await BlogPost.create({
    title,
    body,
  });

  res.redirect("/");
};

// xem chi tiet bai viet
exports.getPostDetail = async (req, res) => {
  const post = await BlogPost.findById(req.params.id);
  res.render("detail", { post });
};

// form sua bai viet
exports.getEditPost = async (req, res) => {
  const post = await BlogPost.findById(req.params.id);
  res.render("edit", { post });
};

// cap nhat bai viet
exports.updatePost = async (req, res) => {
  const { title, body } = req.body;

  await BlogPost.findByIdAndUpdate(req.params.id, {
    title,
    body,
  });

  res.redirect("/");
};

// xoa bai viet
exports.deletePost = async (req, res) => {
  await BlogPost.findByIdAndDelete(req.params.id);
  res.redirect("/");
};
