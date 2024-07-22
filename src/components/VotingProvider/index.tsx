import { User } from "../../types/main";
import TicketDetails from "../TicketDetails";
import VotingCards from "../VotingCards";
import VotingResults from "../VotingResults";
import "./styles.css";

interface VotingProviderProps {
  isVoting: boolean;
  user: User;
}

const VotingProvider = ({ isVoting, user }: VotingProviderProps) => {
  return (
    <article className="app-container__content">
      {user.scrum && <button>Start voting</button>}
      <TicketDetails />
      {isVoting ? <VotingCards /> : <VotingResults />}
    </article>
  );
};

export default VotingProvider;
