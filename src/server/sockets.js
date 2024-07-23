export const initializeSockets = (io) => {
  let users = [];
  let votes = [];

  io.on("connection", (socket) => {
    console.log("New connection stabilished");

    socket.on("dispatch::voteSubmitted", ({ vote, user }) => {
      console.log("Vote received: ", vote, user);
      votes.push({ value: vote, user });
      io.emit("event::voteSubmitted", votes);
    });

    socket.on("dispatch::resetVotes", () => {
      votes = [];
      io.emit("event::voteSubmitted", votes);
    });

    socket.on("dispatch::startVoting", () => {
      votes = [];
      io.emit("event::startVoting");
    });

    socket.on("dispatch::showResults", () => {
      io.emit("event::showResults");
    });

    socket.on("dispatch::join", (data) => {
      console.log("User joined: ", data);
      users.push({ ...data, id: socket.id });
      io.emit("event::join", users);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected: ", socket.id);
      users = users.filter((user) => user.id !== socket.id);
      io.emit("event::leave", users);
    });
  });
};
