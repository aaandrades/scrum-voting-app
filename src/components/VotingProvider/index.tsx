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
    context: { voteSubmitted, startVoting, showResults },
  } = useSocket();
  return (
    <section className="app-container__content">
      <article className="voting-provider__container">
        <TicketDetails />

        {/* {showVotes && voteSubmitted ? <VotingResults /> : <VotingCards />} */}
        {/* {startVoting ? <VotingResults /> : <VotingCards />} */}
        {startVoting && <VotingCards />}
        {(showResults || voteSubmitted) && <VotingResults />}
        {user.scrum && <ScrumActions />}
      </article>
      <Footer />
    </section>
  );
};

export default VotingProvider;
