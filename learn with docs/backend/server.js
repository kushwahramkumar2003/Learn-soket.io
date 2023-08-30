const app = require("express")();

const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    // methods: ["GET", "POST"],
    // allowedHeaders: ["my-custom-header"],
    // credentials: true,
  },
});
io.on("connection", (socket) => {
  //console.log("What si socket", socket);
  console.log("Socket is active to be connected");

  socket.on("chat", (payload) => {
    //listning (chat) event {event is anything like superman batman}
    console.log("what is payload", payload);
    io.emit("chat", payload);
    0; //return response to this event
    console.log(io.engine.clientsCount);
    const count2 = io.of("/").sockets.size;
    console.log(count2);
  });
});
server.listen(5000, () => {
  console.log("listening on *:5000");
});
