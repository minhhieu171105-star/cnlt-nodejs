const express = require("express");
const router = express.Router();

const controller = require("../controllers/studentController");
const { requireLogin } = require("../middleware/authMiddleware");

// AUTH
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "123456") {
    req.session.user = username;
    return res.json({ message: "Login thành công" });
  }

  res.status(401).json({ message: "Sai tài khoản" });
});

router.post("/logout", (req, res) => {
  req.session.destroy();
  res.json({ message: "Đã logout" });
});

// CRUD
router.post("/students", requireLogin, controller.create);
router.get("/students", requireLogin, controller.getAll);
router.get("/students/:id", requireLogin, controller.getById);
router.put("/students/:id", requireLogin, controller.update);
router.delete("/students/:id", requireLogin, controller.delete);

// HEAVY
router.get("/heavy-sync", (req, res) => {
  const start = Date.now();
  while (Date.now() - start < 5000) {}
  res.send("Done sync");
});

router.get("/heavy-async", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  res.send("Done async");
});

// STATS
router.get("/students", requireLogin, controller.getAll);
router.get("/students/:id", requireLogin, controller.getById);
router.get("/students/stats", controller.stats);
router.get("/students/stats/class", controller.statsByClass);

module.exports = router;
