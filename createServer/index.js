import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {});

io.on("connection", (socket) => {});

httpServer.listen(3000, () => {
  console.log(`Server started at port 3000`);
});
