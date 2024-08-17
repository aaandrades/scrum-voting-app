import { enqueueSnackbar } from "notistack";
import { SocketsState, User } from "../../types/main";
import { socket } from "../sockets";

// Socket listeners
export const socketEvents = ({ setValue }: any) => {
  socket.on("event::join", (data) => {
    const { users, description, sessionStarted, id, showingResults } = data;

    setValue((state: SocketsState) => {
      if (state.user.id !== id) {
        return { ...state, users };
      } else {
        return {
          ...state,
          users,
          description,
          startVoting: sessionStarted ? true : false,
          showResults: showingResults,
        };
      }
    });
  });

  socket.on("event::leave", (data) => {
    setValue((state: SocketsState) => ({ ...state, users: data }));
  });

  socket.on("event::startVoting", (users) => {
    setValue((state: SocketsState) => ({
      ...state,
      startVoting: true,
      showResults: false,
      voteSubmitted: false,
      users,
    }));
  });

  socket.on("event::description", (description) => {
    enqueueSnackbar("Description updated", {
      variant: "success",
      autoHideDuration: 1500,
    });
    setValue((state: SocketsState) => ({ ...state, description }));
  });

  socket.on("event::showResults", () => {
    setValue((state: SocketsState) => {
      let isConsensus = false;
      // Clean users without vote
      const nonScrumUsers = state.users.filter((user) => !user.scrum);
      const votes = nonScrumUsers.filter(
        (user) => user.vote && user.vote !== "?"
      );
      // Check if all users have the same vote
      if (votes.length) {
        // Check if all users have the same vote
        const allUsersVoted = votes.length === nonScrumUsers.length;
        const consensus = votes.every((user) => user.vote === votes[0].vote);
        isConsensus = consensus && allUsersVoted;
      }
      return {
        ...state,
        showResults: true,
        startVoting: false,
        voteSubmitted: false,
        isConsensus,
      };
    });
  });

  socket.on(
    "event::voteSubmitted",
    (data: {
      users: User[];
      userId: string;
      showingResults: boolean;
      resetVotes: boolean;
    }) => {
      const { users, userId, showingResults, resetVotes } = data;
      setValue((state: SocketsState) => {
        const isSameUser = userId === state.user.id;
        return {
          ...state,
          users,
          voteSubmitted: state.voteSubmitted || isSameUser,
          showResults: showingResults || false,
          startVoting: resetVotes || state.startVoting,
        };
      });
    }
  );
};
