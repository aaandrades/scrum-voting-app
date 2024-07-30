import { SocketsState, User } from "../../types/main";
import { socket } from "../sockets";

// Socket listeners
export const socketEvents = ({ setValue }: any) => {
  socket.on("event::join", (data) => {
    console.log("User joined FE: ", data);
    const { users, description } = data;
    setValue((state: SocketsState) => ({ ...state, users, description }));
  });

  socket.on("event::leave", (data) => {
    console.log("User left FE: ", data);
    setValue((state: SocketsState) => ({ ...state, users: data }));
  });

  socket.on("event::startVoting", () => {
    setValue((state: SocketsState) => ({
      ...state,
      startVoting: true,
      showResults: false,
      voteSubmitted: false,
    }));
  });

  socket.on("event::description", (description) => {
    setValue((state: SocketsState) => ({ ...state, description }));
  });

  socket.on("event::showResults", () => {
    setValue((state: SocketsState) => ({
      ...state,
      showResults: true,
      startVoting: false,
      voteSubmitted: false,
    }));
  });

  socket.on(
    "event::voteSubmitted",
    (votes: { user: User; value: string }[]) => {
      setValue((state: SocketsState) => {
        const { users } = state;

        const mapUsers = users.map((user) => {
          // Find the last vote for the user
          const vote = votes.reverse().find((vote) => vote.user.id === user.id);
          return vote ? { ...user, vote: vote.value } : { ...user, vote: "" };
        });
        return { ...state, users: mapUsers };
      });
    }
  );
};
