const students = require("../data/students");

// CREATE
exports.create = (req, res) => {
  const { name, email, age, class: cls } = req.body;

  if (!name || name.length < 2)
    return res.status(400).json({ error: "Tên >= 2 ký tự" });

  if (!email.includes("@")) return res.status(400).json({ error: "Email sai" });

  if (students.find((s) => s.email === email))
    return res.status(400).json({ error: "Email trùng" });

  if (age < 16 || age > 60)
    return res.status(400).json({ error: "Tuổi 16-60" });

  const student = {
    id: Date.now(),
    name,
    email,
    age,
    class: cls,
    isDeleted: false,
  };

  students.push(student);
  res.json(student);
};

// GET ALL + FILTER + SORT + PAGINATION
exports.getAll = (req, res) => {
  let { name, class: cls, sort, page = 1, limit = 2 } = req.query;

  let data = students.filter((s) => !s.isDeleted);

  if (name) data = data.filter((s) => s.name.includes(name));
  if (cls) data = data.filter((s) => s.class === cls);

  if (sort === "age_desc") data.sort((a, b) => b.age - a.age);

  const total = data.length;

  page = parseInt(page);
  limit = parseInt(limit);

  const start = (page - 1) * limit;
  const result = data.slice(start, start + limit);

  res.json({ page, limit, total, data: result });
};

// GET BY ID
exports.getById = (req, res) => {
  const student = students.find((s) => s.id == req.params.id && !s.isDeleted);

  if (!student) return res.status(404).json({ error: "Không tìm thấy" });

  res.json(student);
};

// UPDATE
exports.update = (req, res) => {
  const student = students.find((s) => s.id == req.params.id);

  if (!student) return res.status(404).json({ error: "Không tìm thấy" });

  Object.assign(student, req.body);
  res.json(student);
};

// DELETE (SOFT DELETE)
exports.delete = (req, res) => {
  const student = students.find((s) => s.id == req.params.id);

  if (!student) return res.status(404).json({ error: "Không tìm thấy" });

  student.isDeleted = true;
  res.json({ message: "Đã xóa (soft delete)" });
};

// STATS
exports.stats = (req, res) => {
  const total = students.length;
  const active = students.filter((s) => !s.isDeleted).length;
  const deleted = students.filter((s) => s.isDeleted).length;

  const avg =
    active === 0
      ? 0
      : students
          .filter((s) => !s.isDeleted)
          .reduce((sum, s) => sum + s.age, 0) / active;

  res.json({ total, active, deleted, averageAge: avg });
};

// STATS BY CLASS
exports.statsByClass = (req, res) => {
  let map = {};

  students
    .filter((s) => !s.isDeleted)
    .forEach((s) => {
      map[s.class] = (map[s.class] || 0) + 1;
    });

  const result = Object.keys(map).map((c) => ({
    class: c,
    count: map[c],
  }));

  res.json(result);
};
