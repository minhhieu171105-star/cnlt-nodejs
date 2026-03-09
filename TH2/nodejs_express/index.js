const express = require("express");
const app = express();

const port = 4000;

app.use(express.static("public"));

// route trang chủ
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// route trang about
app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/public/about.html");
});

// route trang contact
app.get("/contact", (req, res) => {
  res.sendFile(__dirname + "/public/contact.html");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
