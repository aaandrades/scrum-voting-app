import { SyntheticEvent, useState } from "react";
import "./styles.css";
import Checkbox from "../Checkbox";
import Button from "../Button";
import { User } from "../../types/main";
import Input from "../Input";
import ColorCycleButton from "../ColorCycleButton";

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

      {/* Demo: Button that changes background color on each click */}
      <div style={{ marginBottom: "1rem" }}>
        <ColorCycleButton />
      </div>

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
    </form>
  );
};

export default Login;
