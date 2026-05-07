const socket = io();
let myName = "";
let currentPartnerId = null;
let conversations = {};
let badges = {};

function joinChat() {
  const input = document.getElementById("username");
  myName = input.value.trim();
  if (myName) {
    socket.emit("join", myName);
    document.getElementById("login-overlay").style.display = "none";
    document.getElementById("me-display").innerText = `👤 ${myName}`;
  }
}

socket.on("load-history", (history) => {
  history.forEach((msg) => {
    const partner = msg.from === myName ? msg.to : msg.from;
    if (!conversations[partner]) conversations[partner] = [];
    conversations[partner].push({
      sender: msg.from === myName ? "Bạn" : msg.from,
      message: msg.message,
      time: msg.time,
      isMe: msg.from === myName,
    });
  });
});

socket.on("online-users", (users) => {
  const userList = document.getElementById("users");
  userList.innerHTML = "";

  for (let id in users) {
    const li = document.createElement("li");
    li.className = "user-item";
    if (id === socket.id) {
      li.classList.add("is-me");
      li.innerHTML = `<span> ${users[id]} (Bạn)</span>`;
    } else {
      if (id === currentPartnerId) li.classList.add("active");

      const count = badges[id] || 0;
      li.innerHTML = `
                <span> ${users[id]}</span>
                <span class="badge" id="badge-${id}" style="display: ${count > 0 ? "inline" : "none"}">${count}</span>
            `;
      li.onclick = () => {
        // Xóa active cũ, thêm active mới
        document
          .querySelectorAll(".user-item")
          .forEach((el) => el.classList.remove("active"));
        li.classList.add("active");

        currentPartnerId = id;
        const partnerName = users[id];
        document.getElementById("chatWith").innerText =
          `Chat với ${partnerName}`;
        document.getElementById("msg-input").disabled = false;
        document.getElementById("send-btn").disabled = false;

        badges[id] = 0;
        document.getElementById(`badge-${id}`).style.display = "none";

        renderMessages(partnerName);
      };
    }
    userList.appendChild(li);
  }
});

socket.on("receive-message", (data) => {
  const partnerName = data.isMe ? data.partnerName : data.sender;

  if (!conversations[partnerName]) conversations[partnerName] = [];
  conversations[partnerName].push(data);

  const activeHeader = document.getElementById("chatWith").innerText;

  if (!data.isMe && !activeHeader.includes(partnerName)) {
    const senderId = data.fromId;
    badges[senderId] = (badges[senderId] || 0) + 1;
    const b = document.getElementById(`badge-${senderId}`);
    if (b) {
      b.innerText = badges[senderId];
      b.style.display = "inline";
    }
  }

  if (activeHeader.includes(partnerName)) {
    renderMessages(partnerName);
  }
});

function renderMessages(name) {
  const container = document.getElementById("messages");
  container.innerHTML = "";
  if (conversations[name]) {
    conversations[name].forEach((m) => {
      const div = document.createElement("div");
      div.className = `message ${m.isMe ? "right" : "left"}`;
      div.innerHTML = `<p>${m.message}</p><small>${m.time}</small>`;
      container.appendChild(div);
    });
  }
  container.scrollTop = container.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById("msg-input");
  if (input.value.trim() && currentPartnerId) {
    socket.emit("private-message", {
      toId: currentPartnerId,
      message: input.value,
    });
    input.value = "";
    input.focus();
  }
}
