const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/blogDB");
    console.log("kết nối database thành công!");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
