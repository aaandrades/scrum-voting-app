import { useSocket } from "../../Context/Index";
import { SocketsState, User } from "../../types/main";
import EditButton from "../EditButton";
import "./styles.css";

const VotingResults = () => {
  const { context, setContext } = useSocket();
  const { showResults, users } = context;

  const enableVoting = () => {
    setContext((state: SocketsState) => ({
      ...state,
      voteSubmitted: false,
      showResults: false,
      startVoting: true,
    }));
  };

  return (
    <article className="voting-results__container">
      {users.map((user: User) => (
        <div
          key={user.id}
          className={`${
            user.vote ? "voting-results__item--voted" : "voting-results__item"
          } ${user.scrum ? "voting-results__item--scrum" : ""}
           ${showResults ? "animate__animated animate__flipInX" : ""}`}
        >
          <span className="voting-results__title">{user.name}</span>
          {user.scrum && (
            <strong className="voting-results__scrum">Scrum</strong>
          )}
          {showResults && (
            <span className="voting-results__value">{user.vote}</span>
          )}
          {user.id === context.user.id && user.vote && (
            <EditButton onClick={enableVoting} />
          )}
        </div>
      ))}
    </article>
  );
};

export default VotingResults;
