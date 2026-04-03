const express = require("express");
const bodyParser = require("body-parser");

const connectDB = require("./config/db");
const postRoutes = require("./routes/postRoutes");

const app = express();

connectDB();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", postRoutes);

app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => {
  console.log("Server đang chạy tại http://localhost:3000");
});
