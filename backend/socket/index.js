module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log(`new connection`);
    socket.on("chat:begin", (roomId) => {
      console.log(`${socket.id} joining room ${roomId}`);
      socket.join(roomId);
    });
    socket.on("chat:send", (data) => {
      socket
        .to(data.roomId)
        .emit("chat:receive", { message: data.message, room: data.roomId, user: socket.id });
    });
    socket.on("location:send", (data) => {
      socket.broadcast.emit("location:receive", { lat: data.latitude, lng: data.longitude });
    });
  });
};
