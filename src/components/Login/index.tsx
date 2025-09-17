import { SyntheticEvent, useState } from "react";
import "./styles.css";
import Checkbox from "../Checkbox";
import Button from "../Button";
import { User } from "../../types/main";
import Input from "../Input";
import Modal from "../Modal";

interface LoginProps {
  onActivated: (form: User) => void;
}

const Login = ({ onActivated }: LoginProps) => {
  const [form, setForm] = useState<User>({ id: "", scrum: false, name: "" });
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const handleChange = (e: any, isText = false) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: isText ? e.target.value : e.target.checked,
    }));
  };

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    onActivated(form);
  };

  return (
    <>
      <form className="login" onSubmit={onSubmit} aria-labelledby="login-title">
        <h2 id="login-title" className="login__title">Scrum voting session</h2>
        <p className="login__description">
          Set up your planning poker in seconds, start estimating story points in scrum poker now
        </p>

        <div className="login__form">
          <Input
            id="name"
            name="name"
            placeholder="Your name"
            type="text"
            value={form.name}
            onChange={(e: any) => handleChange(e, true)}
          />
          <Input
            id="id"
            name="id"
            placeholder="Session ID"
            type="text"
            value={form.id}
            onChange={(e: any) => handleChange(e, true)}
          />
          <Checkbox
            id="scrum"
            name="scrum"
            checked={form.scrum}
            label="Enable Scrum Mode"
            onChange={handleChange}
          />
          <Button type="submit" label="Start session" />
        </div>

        <button
          type="button"
          className="login__terms-button"
          aria-haspopup="dialog"
          aria-controls="terms-modal"
          aria-label="Open Terms & Conditions"
          onClick={() => setIsTermsOpen(true)}
        >
          Terms & conditions
        </button>
      </form>

      <Modal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        title="Terms and Conditions of Use"
        id="terms-modal"
      >
        <p>
          Welcome to Our Platform. By accessing or using our service, you agree to be bound by these terms and conditions. If you disagree with any part of the terms, you may not access the service. This is a placeholder document.
        </p>
      </Modal>
    </>
  );
};

export default Login;
