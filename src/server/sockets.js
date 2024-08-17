export const initializeSockets = (io) => {
  let users = [];
  let descriptionBE = "";
  let sessionStarted = false;
  let showingResults = false;

  io.on("connection", (socket) => {
    console.log("New connection stabilished");

    socket.on("dispatch::voteSubmitted", ({ vote, user }) => {
      const alreadyVoted = !!users.find((u) => u.id === user.id).vote;

      users = users.map((u) => (u.id === user.id ? { ...u, vote: vote } : u));
      if (alreadyVoted) {
        io.emit("event::voteSubmitted", {
          users,
          userId: user.id,
          showingResults,
        });
        return;
      }
      io.emit("event::voteSubmitted", { users, userId: user.id });
    });

    socket.on("dispatch::startVoting", () => {
      users = users.map((u) => ({ ...u, vote: "" }));
      sessionStarted = true;
      showingResults = false;
      io.emit("event::startVoting", users);
    });

    socket.on("dispatch::showResults", () => {
      sessionStarted = false;
      showingResults = true;
      io.emit("event::showResults");
    });

    socket.on("dispatch::description", (description) => {
      descriptionBE = description;
      io.emit("event::description", description);
    });

    socket.on("dispatch::join", (data) => {
      users.push({ ...data, id: socket.id });
      io.emit("event::join", {
        users,
        description: descriptionBE,
        sessionStarted,
        showingResults,
        id: socket.id,
      });
    });

    socket.on("disconnect", () => {
      users = users.filter((user) => user.id !== socket.id);
      if (users.length === 0) {
        users = [];
        descriptionBE = "";
        sessionStarted = false;
        showingResults = false;
      }
      io.emit("event::leave", users);
    });
  });
};
