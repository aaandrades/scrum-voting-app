import { useEffect, useState } from "react";
import "./styles.css";
import { io } from "socket.io-client";
import Login from "./components/Login";

const App = () => {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({ name: "", scrum: false });
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

  const increaseNumber = () => {
    setCount(count + 1);
    socket.emit("message", count + 1);
  };

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
            {user.name}
            <div>
              ----- List of current users: <span>{users.length + 1}</span>
              <ul>
                {users.map((user: any) => (
                  <li key={user.id}>{user.name}</li>
                ))}
              </ul>
            </div>
            <button onClick={increaseNumber}>Count</button>
          </nav>
          <article className="app-container__content">
            <p>Scrum voting session</p>
            <div>
              <div>{count}</div>
            </div>
          </article>
        </>
      )}
      <span className="app-container__copyright">
        Made with ❤️ by Andres Andrade
      </span>
    </main>
  );
};

export default App;
