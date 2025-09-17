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
  const [isTermsOpen, setIsTermsOpen] = useState<boolean>(false);

  const handleChange = (e: any, multiText = false) => {
    setForm({
      ...form,
      [e.target.name]: multiText ? e.target.value : e.target.checked,
    });
  };

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
        <Input
          id="name"
          name="name"
          placeholder="Your name"
          type="text"
          value={form.name}
          onChange={(e: any) => handleChange(e, true)}
        />
        <Checkbox
          id="scrum"
          name="scrum"
          label="I am Scrum Master"
          checked={form.scrum}
          onChange={handleChange}
        />
        <Button type="submit" label="Join" />
      </div>

      <button
        type="button"
        className="login__terms-button"
        aria-haspopup="dialog"
        aria-expanded={isTermsOpen}
        onClick={() => setIsTermsOpen(true)}
      >
        Terms & conditions
      </button>

      <Modal
        open={isTermsOpen}
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
