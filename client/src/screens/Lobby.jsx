import React from "react";
import useSocketStore from "../store/socketStore";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LobbyScreen = () => {
    const navigate = useNavigate();
  const socket = useSocketStore((state) => state.socket);
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  const handleJoin = (e) => {
    e.preventDefault();
    socket.emit("room:join", { email, room });
    setEmail("");
    setRoom("");
  };

  const handleJoinRoom = (data) => {
    const { email, room } = data;
    navigate(`/room/${room}`)
  };
  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div>
      <h1>Lobby</h1>
      <form onSubmit={handleJoin}>
        <label htmlFor="email">Email ID</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="room">Room Number</label>
        <input
          type="text"
          id="room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <br />
        <button>Join</button>
      </form>
    </div>
  );
};

export default LobbyScreen;
