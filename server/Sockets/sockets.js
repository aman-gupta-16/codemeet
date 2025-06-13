import { Server } from "socket.io";



const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

export const socketConnection =(server)=>{
    const io = new Server(server, {
  cors: {
    origin: "http://localhost:5174",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
    io.on("connection", (socket) => {
  console.log(`socket is connected : ${socket.id}`);
  socket.on("room:join", ({ email, room }) => {
    console.log(email, room);
    emailToSocketIdMap.set(email, socket.id);
    socketidToEmailMap.set(socket.id, email);
    io.to(socket.id).emit("room:join", { email, room });
    socket.join(room);
    io.to(room).emit("user:joined", { email, id: socket.id });
  });

  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incomming:call", { from: socket.id, offer });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });
});
}