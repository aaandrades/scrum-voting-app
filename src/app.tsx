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
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const { user } = context;

  useEffect(() => {
    // Add listener for resolution
    window.addEventListener("resize", (size: any) => {
      if (size.target.innerWidth < 800) {
        setIsOpen(false);
      }
    });
  }, []);

  const handleActivation = (form: any) => {
    setSession(true);
    setContext({ ...context, user: { ...form, id: socket.id } });
    activateUser({ ...form, votes: "" });
  };

  return (
    <main className={!session ? "app-login" : "app-container"}>
      {!session ? (
        <Login onActivated={handleActivation} />
      ) : (
        <>
          <Nav isOpen={isOpen} handleClick={() => setIsOpen(!isOpen)} />
          <VotingProvider user={user} isNavOpen={isOpen} />
        </>
      )}
    </main>
  );
};

export default App;
