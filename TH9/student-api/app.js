const express = require("express");
const session = require("express-session");

const routes = require("./routes/studentRoutes");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());

// SESSION
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
  }),
);

// MIDDLEWARE
app.use(logger);

// ROUTES
app.use("/", routes);

// ERROR
app.use(errorHandler);

// RUN
app.listen(3000, () => {
  console.log("Server chạy tại http://localhost:3000");
});
