export const initializeSockets = (io) => {
  let users = [];
  let votes = [];
  let descriptionBE = "";
  let sessionStarted = false;
  let showingResults = false;

  io.on("connection", (socket) => {
    console.log("New connection stabilished");

    socket.on("dispatch::voteSubmitted", ({ vote, user }) => {
      console.log("Vote received: ", vote, user);
      const alreadyVoted = votes.find((v) => v.user.id === user.id);
      if (alreadyVoted) {
        votes = votes.map((v) =>
          v.user.id === user.id ? { value: vote, user } : v
        );
        io.emit("event::voteSubmitted", votes);
        return;
      }
      votes.push({ value: vote, user });
      io.emit("event::voteSubmitted", votes);
    });

    socket.on("dispatch::resetVotes", () => {
      votes = [];
      io.emit("event::voteSubmitted", votes);
    });

    socket.on("dispatch::startVoting", () => {
      votes = [];
      sessionStarted = true;
      showingResults = false;
      io.emit("event::startVoting");
    });

    socket.on("dispatch::showResults", () => {
      // sessionStarted = false;
      showingResults = true;
      io.emit("event::showResults");
    });

    socket.on("dispatch::description", (description) => {
      descriptionBE = description;
      io.emit("event::description", description);
    });

    socket.on("dispatch::join", (data) => {
      console.log("User joined: ", data);
      users.push({ ...data, id: socket.id });
      io.emit("event::join", {
        users,
        description: descriptionBE,
        votes,
        sessionStarted,
        // showingResults,
      });
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected: ", socket.id);
      users = users.filter((user) => user.id !== socket.id);
      io.emit("event::leave", users);
    });
  });
};
