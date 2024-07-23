import { useSocket } from "../../Context/Index";
import {
  resetVotesEvent,
  showResultsEvent,
  startVotingEvent,
} from "../../Sockets/emits";
import { User } from "../../types/main";
// import TicketDetails from "../TicketDetails";
import VotingCards from "../VotingCards";
import VotingResults from "../VotingResults";
import "./styles.css";

interface VotingProviderProps {
  user: User;
}

const VotingProvider = ({ user }: VotingProviderProps) => {
  const {
    context: { voteSubmitted, startVoting },
  } = useSocket();
  return (
    <article className="app-container__content">
      {/* <TicketDetails /> */}
      {user.scrum && (
        <div>
          <button type="button" onClick={() => startVotingEvent()}>
            Start voting
          </button>
          <button type="button" onClick={() => showResultsEvent()}>
            Show results
          </button>
          <button type="button" onClick={() => resetVotesEvent()}>
            Clear votes
          </button>
        </div>
      )}

      {/* {showVotes && voteSubmitted ? <VotingResults /> : <VotingCards />} */}
      {/* {startVoting ? <VotingResults /> : <VotingCards />} */}
      {startVoting && <VotingCards />}
      {voteSubmitted && <VotingResults />}
    </article>
  );
};

export default VotingProvider;
