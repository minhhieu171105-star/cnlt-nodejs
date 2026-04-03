const mongoose = require("mongoose");

const BlogPostSchema = new mongoose.Schema(
  {
    title: String,
    body: String,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("BlogPost", BlogPostSchema);
