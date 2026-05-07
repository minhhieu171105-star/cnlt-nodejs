const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

// Kết nối MongoDB (Đổi thành URL của bạn nếu cần)
mongoose
  .connect("mongodb://127.0.0.1:27017/chatDB")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ DB Error:", err));

const Message = mongoose.model(
  "Message",
  new mongoose.Schema({
    from: String,
    to: String,
    message: String,
    time: String,
    timestamp: { type: Date, default: Date.now },
  }),
);

let users = {}; // { socketId: username }

io.on("connection", (socket) => {
  socket.on("join", async (username) => {
    users[socket.id] = username;
    io.emit("online-users", users);

    // Tải lịch sử chat liên quan đến user này
    const history = await Message.find({
      $or: [{ from: username }, { to: username }],
    }).sort({ timestamp: 1 });
    socket.emit("load-history", history);
  });

  socket.on("private-message", async (data) => {
    const senderName = users[socket.id];
    const receiverSocketId = data.toId;
    const receiverName = users[receiverSocketId];

    if (!senderName || !receiverName) return;

    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newMessage = new Message({
      from: senderName,
      to: receiverName,
      message: data.message,
      time: time,
    });
    await newMessage.save();

    // Gửi cho người nhận
    io.to(receiverSocketId).emit("receive-message", {
      sender: senderName,
      message: data.message,
      time: time,
      isMe: false,
      fromId: socket.id, // Để người nhận biết ai gửi mà hiện badge
    });

    // Gửi xác nhận lại cho người gửi
    socket.emit("receive-message", {
      sender: "Bạn",
      message: data.message,
      time: time,
      isMe: true,
      partnerName: receiverName,
      partnerId: receiverSocketId,
    });
  });

  socket.on("disconnect", () => {
    delete users[socket.id];
    io.emit("online-users", users);
  });
});

server.listen(3000, () => console.log("🚀 Server: http://localhost:3000"));
