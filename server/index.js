import express from "express";
import { Server } from "socket.io";

const io = new Server(8000, {
  cors: {
    origin: "http://localhost:5174",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

io.on("connection", (socket) => {
  console.log(`socket is connected : ${socket.id}`);
  socket.on("room:join", ({ email, room }) => {
    console.log(email,room)
    emailToSocketIdMap.set(email, socket.id);
    socketidToEmailMap.set(socket.id, email);
    io.to(socket.id).emit("room:join", {email,room})
    socket.join(room);
    io.to(room).emit("user:joined",{email,id:socket.id})
  });
});
