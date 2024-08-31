import React, { useRef } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const roomIdRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const createRoomHandler = () => {
    const roomId = uuidv4();
    if (roomIdRef.current) {
      roomIdRef.current.value = roomId;
    }
    toast.success("room created");
  };

  const joinRoomHandler = () => {
    const roomId = roomIdRef.current?.value;
    const userName = userNameRef.current?.value;
    if (!roomId || !userName) {
      toast.warning("username and roomId is required");
      return;
    }
    navigate(`/rooms/${roomId}`, { state: { userName: userName } });
  };
  return (
    <div className="flex justify-center items-center">
      <Card className="w-max-[350px] bg-slate-500">
        <CardHeader>
          <CardTitle>Create/Join room</CardTitle>
          {/* <CardDescription>Paste invitation to your room</CardDescription> */}
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                {/* <Label htmlFor="name">Name</Label> */}
                <Input ref={roomIdRef} placeholder="roomID" />
              </div>
              <div className="flex flex-col space-y-1.5">
                {/* <Label htmlFor="name">Name</Label> */}
                <Input ref={userNameRef} placeholder="username" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 justify-end">
          <button onClick={joinRoomHandler} className="btn-primary">
            Join
          </button>
          <p>
            If you don't have an invite then create a{" "}
            <span
              className="underline hover:text-white cursor-pointer"
              onClick={createRoomHandler}
            >
              new room
            </span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Home;
