import { SyntheticEvent, useState } from "react";
import "./styles.css";
import Modal from "../Modal";
import { User } from "../../types/main";

interface LoginProps {
  onActivated: (form: User) => void;
}

const Login = ({ onActivated }: LoginProps) => {
  const [form, setForm] = useState<User>({ id: "", scrum: false, name: "" });
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    onActivated(form);
  };

  return (
    <form className="login" onSubmit={onSubmit} aria-labelledby="login-title">
      <h2 id="login-title" className="login__title">Scrum voting session</h2>
      <p className="login__description">
        Set up your planning poker in seconds, start estimating story points in scrum poker now
      </p>

      <div className="login__form">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.currentTarget.value })}
          required
        />

        <label htmlFor="scrum" className="login__checkbox">
          <input
            id="scrum"
            name="scrum"
            type="checkbox"
            checked={form.scrum}
            onChange={(e) => setForm({ ...form, scrum: e.currentTarget.checked })}
          />
          Scrum master
        </label>

        <button type="submit" className="login__submit">Continue</button>
      </div>

      <button
        type="button"
        className="login__terms-btn"
        onClick={() => setIsTermsOpen(true)}
        aria-haspopup="dialog"
        aria-controls="terms-modal"
      >
        Terms & conditions
      </button>

      <Modal
        id="terms-modal"
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        title="Terms and Conditions of Use"
      >
        <p>
          Welcome to Our Platform. By accessing or using our service, you agree to be bound by these terms and conditions. If you disagree with any part of the terms, you may not access the service. This is a placeholder document.
        </p>
      </Modal>
    </form>
  );
};

export default Login;
