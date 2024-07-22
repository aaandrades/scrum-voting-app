import { createContext } from "react";
import { SocketsState } from "../types/main";

const SocketContext = createContext<SocketsState>({
  users: [],
  votes: [],
  showVotes: false,
  showResults: false,
});

export default SocketContext;
