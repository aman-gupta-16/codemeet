import { io } from "socket.io-client";
import { create } from "zustand";

const useSocketStore = create((set, get) => ({
  socket: io("http://localhost:8000"),

}));

export default useSocketStore;
