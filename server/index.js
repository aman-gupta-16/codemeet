import express from "express";
import cors from "cors";
import { socketConnection } from "./Sockets/sockets.js";
import { createServer } from "http";

const PORT = 3000;

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

 const server = createServer(app);

server.listen(PORT, () => {
  console.log(`Server listening at port: ${PORT}`);
  socketConnection(server);
});
