const app = require("express")();

const server = require("http").createServer(app);

const uuid = require("uuid");
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    // methods: ["GET", "POST"],
    // allowedHeaders: ["my-custom-header"],
    // credentials: true,
  },
});

io.engine.generateId = (req) => {
  //generate id for each socket
  let id = uuid.v4();
  console.log("what is id", id);
  return id;
  //return uuid.v4();
};

io.engine.on("initial_headers", (headers, req) => {
  //handle initial_headers event to set custom headers
  headers["test"] = "123";
  headers["set-cookie"] = "mycookie=456";
  console.log("what is headers", headers);
});

io.engine.on("headers", (headers, req) => {
  // handle headers event to set custom headers
  headers["test"] = "789";
});

io.engine.on("connection_error", (err) => {
  //handle connection_error event
  console.log(err.req); // the request object
  console.log(err.code); // the error code, for example 1
  console.log(err.message); // the error message, for example "Session ID unknown"
  console.log(err.context); // some additional error context
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
