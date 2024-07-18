export const initializeSockets = (io) => {
  let users = [];

  io.on("connection", (socket) => {
    console.log("New connection stabilished");

    // Handle socket events here
    socket.on("message", (data) => {
      console.log("Message received: ", data);
      // Broadcast the message to all clients
      io.emit("message", data);
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
