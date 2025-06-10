import React from "react";
import useSocketStore from "../store/socketStore";
import { useEffect } from "react";
import { useState } from "react";
import ReactPlayer from 'react-player'


const RoomPage = () => {
  const socket = useSocketStore((state) => state.socket);
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const handleUserJoined = ({ email, id }) => {
    console.log("user joined with this email ", email);
    setRemoteSocketId(id);
  };
  const handleCallUser = async () => {
    const stream = navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setMyStream(stream)
  };

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    return () => {
      socket.off("user:joined", handleUserJoined);
    };
  }, [socket, handleUserJoined]);
  return (
    <div>
      <h1>Room page</h1>
      <h4>{remoteSocketId ? "Connected" : "No one in room"}</h4>
      {remoteSocketId && <button onClick={handleCallUser}>CALL</button>}
       {myStream && (
        <>
          <h1>My Stream</h1>
          <ReactPlayer
            playing
            muted
            height="100px"
            width="200px"
            url={myStream}
          />
        </>
      )}
    </div>
  );
};

export default RoomPage;
