import { socket } from "../sockets";

export const activateUser = (form: any) => {
  socket.emit("dispatch::join", form);
};
