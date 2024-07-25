import { useSocket } from "../../Context/Index";
import { User } from "../../types/main";
import "./styles.css";

const VotingResults = () => {
  const { context } = useSocket();
  const { showResults, users } = context;

  return (
    <article className="voting-results__container">
      {users.map((user: User) => (
        <div
          key={user.id}
          className={`${
            user.vote ? "voting-results__item--voted" : "voting-results__item"
          }`}
        >
          <span className="voting-results__title">{user.name}</span>
          {showResults && (
            <span className="voting-results__value">{user.vote}</span>
          )}
        </div>
      ))}
    </article>
  );
};

export default VotingResults;
