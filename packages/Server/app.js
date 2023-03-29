require("dotenv").config();

const app = require("express")();
require("./app-config")(app);
const http = require("http").Server(app);
const io = require("socket.io")(http);

const PORT = process.env.PORT || 5000;

io.on("connection", function (socket) {
  console.log("A user connected");

  socket.on("disconnect", function () {
    console.log("A user disconnected");
  });
});

http.listen(PORT, function () {
  console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
