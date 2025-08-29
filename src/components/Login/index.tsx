import { SyntheticEvent, useState } from "react";
import "./styles.css";
import Checkbox from "../Checkbox";
import Button from "../Button";
import { User } from "../../types/main";
import Input from "../Input";

interface LoginProps {
  onActivated: (form: User) => void;
}

const Login = ({ onActivated }: LoginProps) => {
  const [form, setForm] = useState<User>({ id: "", scrum: false, name: "" });

  // Color-cycling button state
  const [btnColorIndex, setBtnColorIndex] = useState(0);
  const colorCycle = [
    "var(--main-btn)",
    "var(--primary-100)",
    "var(--primary-200)",
    "var(--primary-300)",
    "var(--bg-300)"
  ];

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

  const handleColorClick = () => {
    setBtnColorIndex((i) => (i + 1) % colorCycle.length);
  };

  return (
    <form className="login" onSubmit={onSubmit}>
      <h2 className="login__title">Scrum voting session</h2>
      <p className="login__description">
        Set up your planning poker in seconds, start estimating story points in
        scrum poker now
      </p>

      <div className="login__form">
        {/* Other login fields can stay here */}
        <button
          type="button"
          className="button-container"
          style={{ backgroundColor: colorCycle[btnColorIndex] }}
          onClick={handleColorClick}
          aria-label="Cycle button color"
        >
          Click to change color
        </button>
      </div>
    </form>
  );
};

export default Login;
