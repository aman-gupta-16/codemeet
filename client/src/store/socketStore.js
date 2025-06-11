import { io } from "socket.io-client";
import { create } from "zustand";

const useSocketStore = create((set, get) => ({
  socket: null,

  connectSocket: () => {
    const socket = io("http://localhost:8000");
    set({ socket });
  },

  disconnectSocket: () => {
    const socket = get().socket;
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },
}));

export default useSocketStore;
