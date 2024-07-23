import { useSocket } from "../../Context/Index";
import { User } from "../../types/main";
import "./styles.css";

const VotingResults = () => {
  const { context } = useSocket();
  const { showResults, users } = context;
  console.log({ users });
  return (
    <article>
      <div>
        {users.map((user: User) => (
          <div
            key={user.id}
            className={`${user.vote ? "voting-result__item--voted" : ""}`}
          >
            <span>{user.name}</span>
            {showResults && <span>{user.vote}</span>}
          </div>
        ))}
      </div>
    </article>
  );
};

export default VotingResults;
