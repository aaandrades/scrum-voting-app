import {
  resetVotesEvent,
  showResultsEvent,
  startVotingEvent,
} from "../../Sockets/emits";
import "./styles.css";

const ScrumActions = () => {
  return (
    <div className="scrum-actions">
      <button
        className="scrum-actions__button"
        type="button"
        onClick={() => startVotingEvent()}
      >
        Start voting
      </button>
      <button
        className="scrum-actions__button"
        type="button"
        onClick={() => showResultsEvent()}
      >
        Show results
      </button>
      <button
        className="scrum-actions__button"
        type="button"
        onClick={() => resetVotesEvent()}
      >
        Clear votes
      </button>
    </div>
  );
};

export default ScrumActions;
