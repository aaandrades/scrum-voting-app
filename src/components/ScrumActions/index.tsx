import {
  resetVotesEvent,
  showResultsEvent,
  startVotingEvent,
} from "../../Sockets/emits";
import Button from "../Button";
import "./styles.css";

const ScrumActions = () => {
  return (
    <div className="scrum-actions">
      <Button
        type="button"
        onClick={() => startVotingEvent()}
        label="Start voting"
      />
      <Button
        type="button"
        onClick={() => showResultsEvent()}
        label="Show results"
      />
      <Button
        type="button"
        onClick={() => resetVotesEvent()}
        label="Clear votes"
      />
    </div>
  );
};

export default ScrumActions;
