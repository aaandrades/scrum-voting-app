import { SocketsState } from "../../types/main";
import { socket } from "../sockets";

// Socket listeners
export const socketEvents = ({ setValue }: any) => {
  // Handle incoming messages
  socket.on("message", (data) => {
    console.log("Message received FE: ", data);
  });

  socket.on("event::join", (data) => {
    console.log("User joined FE: ", data);
    setValue((state: SocketsState) => ({ ...state, users: data }));
  });

  socket.on("event::leave", (data) => {
    console.log("User left FE: ", data);
    setValue((state: SocketsState) => ({ ...state, users: data }));
  });
};
