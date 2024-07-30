import { User } from "../../types/main";
import { socket } from "../sockets";

export const activateUser = (form: any) => {
  socket.emit("dispatch::join", form);
};

export const startVotingEvent = () => {
  socket.emit("dispatch::startVoting");
};

export const submitVoteEvent = (vote: string, user: User) => {
  socket.emit("dispatch::voteSubmitted", { vote, user });
};

export const resetVotesEvent = () => {
  socket.emit("dispatch::resetVotes");
};

export const showResultsEvent = () => {
  socket.emit("dispatch::showResults");
};

export const submitDescriptionEvent = (description: string) => {
  socket.emit("dispatch::description", description);
};
