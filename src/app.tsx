import { useEffect, useState } from "react";
import "./styles.css";
import { io } from "socket.io-client";
import Login from "./components/Login";
import Profile from "./components/Profile";
import ActiveUsers from "./components/ActiveUsers";
import VotingProvider from "./components/VotingProvider";
import Footer from "./components/Footer";

const App = () => {
  const [count, setCount] = useState(0);
  const [isVoting, setIsVoting] = useState(true);
  const [user, setUser] = useState({ id: "", name: "", scrum: false });
  const [users, setUsers] = useState([]);
  const [session, setSession] = useState(false);
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    // Connect to the Socket.IO server
    const newSocket = io();
    setSocket(newSocket);

    // Handle incoming messages
    newSocket.on("message", (data) => {
      setCount(data);
      console.log("Message received FE: ", data);
    });

    newSocket.on("event::join", (data) => {
      console.log("User joined FE: ", data);
      setUsers(data);
    });

    newSocket.on("event::leave", (data) => {
      console.log("User left FE: ", data);
      setUsers(data);
    });

    // Clean up on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleActivation = (form: any) => {
    setSession(true);
    setUser(form);

    socket.emit("dispatch::join", form);
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
