import CodeEditor from "@/components/CodeEditor";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "@/types/socketEvents";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { io,Socket as SocketIOClient } from "socket.io-client";

export type Socket =SocketIOClient<ServerToClientEvents, ClientToServerEvents>;
const socket: Socket = io(
  "http://localhost:8080"
);

const Workspace: React.FC = () => {
  const [code, setCode] = useState<string>("");
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const roomId: string | undefined = params?.roomId;
  const userName: string | undefined = location.state?.userName;

  const onCodeChange = (code:string) => {
    setCode(code);
  };

  useEffect(() => {
    if (!roomId || !userName) {
      navigate("/");
      return;
    }
    socket.emit("joinRoom", { roomId, userName });

    socket.on("roomJoined", (data) => {
      if(userName!==data.userName){
        toast.success(`${data.userName} has joined the room`);
      }
    });
    return ()=>{
      socket.off("roomJoined");
    }
  }, []);
  return (
    <div className="min-h-screen bg-[url(https://wallpaperaccess.com/full/1145374.jpg)]">
      <CodeEditor roomId={roomId} onCodeChange={onCodeChange} socket={socket} userName={userName} />
    </div>
  );
};

export default Workspace;
