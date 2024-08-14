import { useEffect, useState } from "react";
import "./styles.css";
import Login from "./components/Login";
import Profile from "./components/Profile";
import ActiveUsers from "./components/ActiveUsers";
import VotingProvider from "./components/VotingProvider";
import { useSocket } from "./Context/Index";
import { activateUser } from "./Sockets/emits";
import { socket } from "./Sockets/sockets";
import "animate.css";
import Footer from "./components/Footer";

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
          <nav className="app-container__navbar">
            <Profile user={user.name} />
            <ActiveUsers users={context.users} />
          </nav>
          <VotingProvider user={user} />
        </>
      )}
      <Footer />
    </main>
  );
};

export default App;
