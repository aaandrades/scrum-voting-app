import { enqueueSnackbar } from "notistack";
import { SocketsState, User } from "../../types/main";
import { socket } from "../sockets";

// Socket listeners
export const socketEvents = ({ setValue }: any) => {
  socket.on("event::join", (data) => {
    console.log("User joined FE: ", data);
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
    console.log("User left FE: ", data);
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
    setValue((state: SocketsState) => ({
      ...state,
      showResults: true,
      startVoting: false,
      voteSubmitted: false,
    }));
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
        console.log("NEW USERS: ", users);
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
