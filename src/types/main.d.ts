export interface User {
  id: string;
  name: string;
  scrum: boolean;
  vote?: string;
}

export interface SocketsState {
  users: User[];
  showResults: boolean;
  voteSubmitted: boolean;
  startVoting: boolean;
  user: User;
  description: string;
}
export interface SocketsContextI {
  context: SocketsState;
  setContext: any;
}

export interface VoteI {
  user: User;
  vote: string;
}
