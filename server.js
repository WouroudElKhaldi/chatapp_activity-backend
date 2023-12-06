const express = require("express");
const socketIO = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// handeling the connection to socket
io.on("connection", (socket) => {
  console.log("user connected");

  // creating a room using join
  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log(`user joined on room ${room}`);
  });
  // sending the message to the room
  socket.on("message", (msg) => {
    console.log("message from  ", msg);
    io.to(msg.room).emit("message", { text: msg, sender: "recived" }); // the sender send a signal to the on
  });
  //handeling disconne
  socket.on("disconnect", () => {
    console.log("user disconnected ");
  });
});

server.listen(5100, () => {
  console.log("server is running on port 5100");
});
