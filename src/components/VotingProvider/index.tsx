import { useSocket } from "../../Context/Index";
import { User } from "../../types/main";
import ScrumActions from "../ScrumActions";
import TicketDetails from "../TicketDetails";
import VotingCards from "../VotingCards";
import VotingResults from "../VotingResults";
import Confetti from "react-confetti";

import "./styles.css";
import { useMemo } from "react";

interface VotingProviderProps {
  user: User;
  isNavOpen: boolean;
}

const VotingProvider = ({ user, isNavOpen }: VotingProviderProps) => {
  const { context } = useSocket();
  const { startVoting, showResults, users, isConsensus } = context;

  const calculateAverage = () =>
    useMemo(() => {
      const votes = users
        .filter((user) => !user.scrum && user.vote && user.vote !== "?")
        .map((user) => parseInt(user.vote || "0", 10));
      const total = votes.reduce((acc, vote) => acc + vote, 0);
      const result = total / votes.length;
      return isNaN(result) ? 0 : result.toFixed(2);
    }, [users]);

  return (
    <section
      className={`app-container__content app-container__content${
        isNavOpen ? "--open" : "--closed"
      }`}
    >
      <TicketDetails />
      {showResults && (
        <p className="voting-provider__average-result">
          Average: {calculateAverage()}
        </p>
      )}
      {startVoting && !user.scrum ? <VotingCards /> : <VotingResults />}
      {user.scrum && <ScrumActions />}
      {showResults && isConsensus && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={150}
        />
      )}
    </section>
  );
};

export default VotingProvider;
