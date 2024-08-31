import express, { Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});
dotenv.config();
const port: number | string = process.env.PORT || 8080;

io.on("connection", (socket) => {
  console.log("A user is connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("joinRoom", (data) => {
    const { userName, roomId } = data;
    socket.join(roomId);
    io.to(roomId).emit("roomJoined", { userName });
  });

  socket.on("changeInCode", (data) => {
    const { roomId, code,userName } = data;
    io.to(roomId).emit("syncCode", { code,userName });
  });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
