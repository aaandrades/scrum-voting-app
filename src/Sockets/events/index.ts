import { SocketsState, VoteI } from "../../types/main";
import { socket } from "../sockets";

// Socket listeners
export const socketEvents = ({ setValue }: any) => {
  socket.on("event::join", (data) => {
    console.log("User joined FE: ", data);
    setValue((state: SocketsState) => ({ ...state, users: data }));
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

  socket.on("event::showResults", () => {
    setValue((state: SocketsState) => ({
      ...state,
      showResults: true,
      startVoting: false,
      voteSubmitted: false,
    }));
  });

  socket.on("event::voteSubmitted", (votes) => {
    setValue((state: SocketsState) => {
      const { users } = state;

      const mapUsers = users.map((user) => {
        const vote = votes.find((vote: VoteI) => vote.user.id === user.id);
        return vote ? { ...user, vote: vote.value } : { ...user, vote: "" };
      });
      return { ...state, users: mapUsers };
    });
  });
};
