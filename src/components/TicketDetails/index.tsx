import { useState } from "react";
import { useSocket } from "../../Context/Index";
import Button from "../Button";
import Input from "../Input";
import "./styles.css";
import { submitDescriptionEvent } from "../../Sockets/emits";

const TicketDetails = () => {
  const [scrumDescription, setScrumDescription] = useState<string>("");
  const { context } = useSocket();
  const { user, description } = context;

  const submitDescription = (e: any) => {
    e.preventDefault();
    submitDescriptionEvent(scrumDescription);
  };

  return (
    <article className="ticket-details">
      <h2 className="ticket-details__title">Ticket details</h2>
      {user.scrum && (
        <p className="ticket-details__description">
          Add a description to the ticket
        </p>
      )}
      {user.scrum ? (
        <form className="ticket-details__content" onSubmit={submitDescription}>
          <Input
            className="general-input"
            id="description"
            name="description"
            placeholder="Example: www.manulife-jira.com/gwamuer-123123"
            type="text"
            value={scrumDescription}
            onChange={(e: any) => setScrumDescription(e.target.value)}
          />
          <Button
            onClick={submitDescription}
            type="submit"
            label="Update description"
          />
        </form>
      ) : description ? (
        <p className="ticket-details__empty">{description}</p>
      ) : (
        <p className="ticket-details__empty">
          <em>No description</em>
        </p>
      )}
    </article>
  );
};

export default TicketDetails;
