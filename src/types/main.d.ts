export interface User {
  id: string;
  name: string;
  scrum: boolean;
}

export interface SocketsState {
  users: User[];
  votes: any[];
  showVotes: boolean;
  showResults: boolean;
}
