export interface User {
  id: string;
  name: string;
  scrum: boolean;
  vote?: string;
}

export interface SocketsState {
  users: User[];
  showVotes: boolean;
  showResults: boolean;
  voteSubmitted: boolean;
  startVoting: boolean;
  user: User;
}
export interface SocketsContextI {
  context: SocketsState;
  setContext: any;
}

export interface VoteI {
  user: User;
  vote: string;
}
