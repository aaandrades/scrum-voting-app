import { useState, useEffect, useContext } from "react";

import SocketContext from "./context";
import { initSockets } from "../Sockets/sockets";

const SocketProvider = (props: any) => {
  const [value, setValue] = useState({
    users: [],
    votes: [],
    showVotes: false,
    showResults: false,
  });

  useEffect(() => initSockets({ setValue }), [initSockets]);

  return (
    <SocketContext.Provider value={value}>
      {props.children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
export default SocketProvider;
