const express = require("express");
const app = express();
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

const http = require("http").Server(app);

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:5173/",
  },
});

socketIO.on("connection", (socket) => {
  socket.onAny((type, msg) => {
    console.log(msg);
    socketIO.emit(type, msg);
  });
  socket.on("disconnect", (socket) => {
    console.log("userDisconnected");
  });
});

http.listen(3000, () => {
  console.log("listening", `http://localhost:3000`);
});
