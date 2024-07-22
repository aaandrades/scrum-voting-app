import { useState } from "react";
import "./styles.css";
import { SCRUM_VALUES } from "../../utils/constants";
import Button from "../Button";

const VotingCards = () => {
  const [selection, setSelection] = useState<number | string>("");

  const handleSelection = () => {
    console.log("vote: ", selection);
  };

  return (
    <article className="voting-container">
      <h2 className="voting-container__title">Click on a card to vote</h2>
      <div className="voting-container__cards-grid">
        {SCRUM_VALUES.map((value) => (
          <button
            key={value}
            className={`voting-container__vote ${
              selection === value ? "option-selected" : ""
            }`}
            type="button"
            onClick={() => setSelection(value)}
          >
            {value}
          </button>
        ))}
      </div>
      <div className="voting-container__confirm">
        <Button
          onClick={handleSelection}
          label="Confirm vote"
          disabled={!selection}
        />
      </div>
    </article>
  );
};

export default VotingCards;
