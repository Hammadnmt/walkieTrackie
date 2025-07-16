const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
require("./backend/socket/index.js")(io);

server.listen(3000, () => {
  console.log(`sever up and accessible @ http://localhost:3000`);
});
