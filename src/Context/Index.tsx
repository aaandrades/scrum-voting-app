import { useState, useEffect, useContext } from "react";

import SocketContext from "./context";
import { initSockets } from "../Sockets/sockets";

const SocketProvider = (props: any) => {
  const [value, setValue] = useState({
    users: [],
    showVotes: false,
    showResults: false,
    voteSubmitted: true,
    startVoting: false,
    description: "",
    user: { id: "", name: "", scrum: false },
  });

  useEffect(() => initSockets({ setValue }), [initSockets]);

  return (
    <SocketContext.Provider value={{ context: value, setContext: setValue }}>
      {props.children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
export default SocketProvider;
