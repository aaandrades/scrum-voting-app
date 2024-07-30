import { createContext } from "react";
import { SocketsContextI } from "../types/main";

const SocketContext = createContext<SocketsContextI>({
  context: {
    users: [],
    showVotes: false,
    showResults: false,
    user: { id: "", name: "", scrum: false },
    voteSubmitted: false,
    description: "",
    startVoting: false,
  },
  setContext: () => {},
});

export default SocketContext;
