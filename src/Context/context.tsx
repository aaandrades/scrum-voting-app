import { createContext } from "react";
import { SocketsContextI } from "../types/main";

const SocketContext = createContext<SocketsContextI>({
  context: {
    users: [],
    description: "",
    startVoting: false,
    showResults: false,
    voteSubmitted: false,
    user: { id: "", name: "", scrum: false },
  },
  setContext: () => {},
});

export default SocketContext;
