import { useSocket } from "../../Context/Index";
import { User } from "../../types/main";
import Footer from "../Footer";
import ScrumActions from "../ScrumActions";
import TicketDetails from "../TicketDetails";
import VotingCards from "../VotingCards";
import VotingResults from "../VotingResults";
import "./styles.css";

interface VotingProviderProps {
  user: User;
}

const VotingProvider = ({ user }: VotingProviderProps) => {
  const {
    context: { startVoting, showResults, users },
  } = useSocket();

  const calculateAverage = () => {
    const votes = users
      .filter((user) => !user.scrum && user.vote)
      .map((user) => parseInt(user.vote || "0", 10));
    const total = votes.reduce((acc, vote) => acc + vote, 0);
    return total / votes.length;
  };

  return (
    <section className="app-container__content">
      <TicketDetails />
      {showResults && (
        <p className="voting-provider__average-result">
          Average: {calculateAverage()}
        </p>
      )}
      {startVoting && !user.scrum ? <VotingCards /> : <VotingResults />}
      {/* {(showResults || voteSubmitted || user.scrum) && <VotingResults />} */}
      {/* {startVoting && !user.scrum && <VotingCards />}
        {(showResults || voteSubmitted || user.scrum) && <VotingResults />} */}
      {user.scrum && <ScrumActions />}
      {/* <Footer /> */}
    </section>
  );
};

export default VotingProvider;
