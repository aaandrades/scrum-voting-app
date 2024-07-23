import { useState } from "react";
import "./styles.css";
import Login from "./components/Login";
import Profile from "./components/Profile";
import ActiveUsers from "./components/ActiveUsers";
import VotingProvider from "./components/VotingProvider";
import Footer from "./components/Footer";
import { useSocket } from "./Context/Index";
import { activateUser } from "./Sockets/emits";
import { socket } from "./Sockets/sockets";

const App = () => {
  const { context, setContext } = useSocket();
  const [session, setSession] = useState(false);
  const { user } = context;

  const handleActivation = (form: any) => {
    setSession(true);
    setContext({ ...context, user: { ...form, id: socket.id } });
    activateUser(form);
  };

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
