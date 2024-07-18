import React, { useState } from "react";
import "./styles.css";
import Checkbox from "../Checkbox";
import Button from "../Button";

const Login = ({ onActivated }) => {
  const [form, setForm] = useState({ scrum: false, name: "" });

  const handleChange = (e, multiText = false) => {
    setForm({
      ...form,
      [e.target.name]: multiText ? e.target.value : e.target.checked,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onActivated(form);
  };

  return (
    <form className="login-container" onSubmit={onSubmit}>
      <h2 className="login-container__title">Scrum voting session</h2>
      <p className="login-container__description">
        Set up your planning poker in seconds, start estimating story points in
        scrum poker now
      </p>
      <div className="login-container__form">
        <input
          className="login-container__input"
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
