import { useEffect, useState } from "react";
import Login from "./components/Login";
import VotingProvider from "./components/VotingProvider";
import { useSocket } from "./Context/Index";
import { activateUser } from "./Sockets/emits";
import { socket } from "./Sockets/sockets";
import Nav from "./components/Nav";
import "./styles.css";
import "animate.css";

const App = () => {
  const { context, setContext } = useSocket();
  const [session, setSession] = useState(false);
  const { user } = context;

  const handleActivation = (form: any) => {
    setSession(true);
    setContext({ ...context, user: { ...form, id: socket.id } });
    activateUser({ ...form, votes: "" });
  };

  useEffect(() => {
    // Add listener for resolution
    window.addEventListener("resize", (size: any) => {
      if (size.target.innerWidth < 1000) {
        console.log("EXECUTING");
      }
    });
  }, []);

  return (
    <main className={!session ? "app-login" : "app-container"}>
      {!session ? (
        <Login onActivated={handleActivation} />
      ) : (
        <>
          <Nav />
          <VotingProvider user={user} />
        </>
      )}
    </main>
  );
};

export default App;
