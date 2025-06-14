import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://chat-app-7kgl.onrender.com",
    credentials: true
  },
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// used to store online users
const userSocketMap = {}; // {userId: socketId}

export const initializeSocket = (io) => {
  const onlineUsers = new Map();

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
      onlineUsers.set(userId, socket.id);
      io.emit("getOnlineUsers", Array.from(onlineUsers.keys()));
    }

    socket.on("disconnect", () => {
      if (userId) {
        onlineUsers.delete(userId);
        io.emit("getOnlineUsers", Array.from(onlineUsers.keys()));
      }
    });
  });
};

export { io, app, server };
