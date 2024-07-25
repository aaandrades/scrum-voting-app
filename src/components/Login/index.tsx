import { SyntheticEvent, useState } from "react";
import "./styles.css";
import Checkbox from "../Checkbox";
import Button from "../Button";
import { User } from "../../types/main";

interface LoginProps {
  onActivated: (form: User) => void;
}

const Login = ({ onActivated }: LoginProps) => {
  const [form, setForm] = useState<User>({ id: "", scrum: false, name: "" });

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
    <form className="login" onSubmit={onSubmit}>
      <h2 className="login__title">Scrum voting session</h2>
      <p className="login__description">
        Set up your planning poker in seconds, start estimating story points in
        scrum poker now
      </p>
      <div className="login__form">
        <input
          className="login__input"
          id="login"
          name="name"
          type="text"
          placeholder="Enter your name"
          onChange={(e) => handleChange(e, true)}
        />
        <Checkbox value={form.scrum} onChange={handleChange} />
        <Button type="submit" label="Join room" disabled={!form.name} />
      </div>
    </form>
  );
};

export default Login;
