import { useState } from "react";
import "./styles.css";
import Login from "./components/Login";
import Profile from "./components/Profile";
import ActiveUsers from "./components/ActiveUsers";
import VotingProvider from "./components/VotingProvider";
import Footer from "./components/Footer";
import { useSocket } from "./Context/Index";
import { activateUser } from "./Sockets/emits";

const App = () => {
  const { users } = useSocket();
  const [isVoting, setIsVoting] = useState(true);
  const [user, setUser] = useState({ id: "", name: "", scrum: false });
  const [session, setSession] = useState(false);

  const handleActivation = (form: any) => {
    setSession(true);
    setUser(form);
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
            <ActiveUsers users={users} />
          </nav>
          <VotingProvider isVoting={isVoting} user={user} />
        </>
      )}
      <Footer />
    </main>
  );
};

export default App;
