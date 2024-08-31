export interface ClientToServerEvents {
  joinRoom: (data: { roomId: string; userName: string }) => void;
  changeInCode: (data: {
    roomId: string;
    code: string;
    userName: string;
  }) => void;
}
export interface ServerToClientEvents {
  syncCode: (data: { code: string; userName: string }) => void;
  roomJoined: (data: { userName: string }) => void;
}
