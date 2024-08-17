import { enqueueSnackbar } from "notistack";
import { useSocket } from "../../Context/Index";
import { showResultsEvent, startVotingEvent } from "../../Sockets/emits";
import Button from "../Button";
import "./styles.css";

const ScrumActions = () => {
  const { context } = useSocket();
  const { startVoting } = context;

  const handleStartVoting = () => {
    startVotingEvent();
    enqueueSnackbar("Session started", {
      variant: "info",
      autoHideDuration: 1500,
    });
  };
  return (
    <div className="scrum-actions">
      <Button
        type="button"
        onClick={() => handleStartVoting()}
        label={startVoting ? "Session in progress" : "Start voting"}
        disabled={startVoting}
      />
      <Button
        type="button"
        onClick={() => showResultsEvent()}
        label="Show results"
      />
    </div>
  );
};

export default ScrumActions;
