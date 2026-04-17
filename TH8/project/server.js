const http = require("http");
const fs = require("fs");
const formidable = require("formidable");

// tạo folder uploads nếu chưa có
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

const server = http.createServer((req, res) => {
  // ===== SERVE FILE =====
  if (req.url.startsWith("/uploads/")) {
    const filePath = "." + req.url;

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        return res.end("Không tìm thấy file");
      }
      res.end(data);
    });
    return;
  }

  // ===== UPLOAD =====
  if (req.url === "/upload" && req.method === "POST") {
    const form = new formidable.IncomingForm({
      uploadDir: "uploads/",
      multiples: true,
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
        return res.end("Lỗi upload");
      }

      let list = files.files;

      if (!Array.isArray(list)) {
        list = [list];
      }

      if (list.length > 17) {
        res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
        return res.end("Chỉ tối đa 17 file");
      }

      // kiểm tra trùng
      for (let file of list) {
        let path = "uploads/" + file.originalFilename;
        if (fs.existsSync(path)) {
          return res.end("File đã tồn tại: " + file.originalFilename);
        }
      }

      let count = 0;

      list.forEach((file) => {
        let newPath = "uploads/" + file.originalFilename;

        fs.rename(file.filepath, newPath, () => {
          count++;
          if (count === list.length) {
            res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
            res.end("Upload nhiều file thành công.");
          }
        });
      });
    });

    return;
  }

  // ===== DANH SÁCH FILE =====
  if (req.url === "/files") {
    fs.readdir("uploads", (err, files) => {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

      let html = `
      <html>
      <head>
      <meta charset="UTF-8">
      <style>
        body {font-family: Arial; background:#f2f2f2; text-align:center;}
        .container {
          display:grid;
          grid-template-columns:repeat(auto-fill,minmax(220px,1fr));
          gap:20px; width:80%; margin:auto;
        }
        .card {
          background:white;
          padding:15px;
          border-radius:10px;
          box-shadow:0 4px 10px rgba(0,0,0,0.1);
          text-align:left;
        }
        .delete-btn {
          display:none;
          margin:20px;
          padding:10px 20px;
          background:red;
          color:white;
          border:none;
          border-radius:6px;
          cursor:pointer;
        }
      </style>
      </head>
      <body>

      <h2>📂 Danh sách file</h2>

      <button id="deleteBtn" class="delete-btn" onclick="deleteSelected()">
        🗑️ Xóa đã chọn
      </button>

      <div class="container">
      `;

      files.forEach((f) => {
        let stat = fs.statSync("uploads/" + f);

        html += `
        <div class="card" id="file-${f}">
          <input type="checkbox" value="${f}" class="chk" onchange="updateDeleteButton()" />
          <div><b>${f}</b></div>
          <div>📦 ${(stat.size / 1024).toFixed(2)} KB</div>
          <div>🕒 ${stat.mtime.toLocaleString()}</div>
          <a href="/uploads/${f}" target="_blank">📂 Mở</a>
        </div>`;
      });

      html += `
      </div>

      <a href="/">⬅ Quay lại</a>

      <script>
      function updateDeleteButton() {
        const checked = document.querySelectorAll(".chk:checked");
        const btn = document.getElementById("deleteBtn");

        if (checked.length > 0) {
          btn.style.display = "inline-block";
        } else {
          btn.style.display = "none";
        }
      }

      async function deleteSelected() {
        const checked = document.querySelectorAll(".chk:checked");

        if (checked.length === 0) {
          alert("Chưa chọn file");
          return;
        }

        if (!confirm("Xóa các file đã chọn?")) return;

        const names = Array.from(checked).map(c => c.value);

        const res = await fetch("/delete-multiple", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({ names })
        });

        const text = await res.text();

        if (res.ok) {
          names.forEach(name => {
            const el = document.getElementById("file-" + name);
            if (el) el.remove();
          });

          updateDeleteButton(); // cập nhật lại nút
        } else {
          alert(text);
        }
      }
      </script>

      </body>
      </html>
      `;

      res.end(html);
    });

    return;
  }

  // ===== XÓA NHIỀU =====
  if (req.url === "/delete-multiple" && req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => (body += chunk));

    req.on("end", () => {
      const data = JSON.parse(body);
      const names = data.names;

      names.forEach((name) => {
        const filePath = "uploads/" + name;
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });

      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Đã xóa các file");
    });

    return;
  }

  // ===== TRANG CHỦ =====
  fs.readFile("./views/master.html", (err, data) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
});

server.listen(8017, () => {
  console.log("http://localhost:8017");
});
