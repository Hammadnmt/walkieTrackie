// server/index.js
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`🟢 ${socket.id} connected`);

  socket.on("location:update", (data) => {
    socket.broadcast.emit("location:receive", data);
  });

  socket.on("disconnect", () => {
    console.log(`🔴 ${socket.id} disconnected`);
  });
});

server.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
