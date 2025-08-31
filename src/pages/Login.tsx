import React, { useState } from "react";
import Modal from "../components/Modal/Modal";
import "./Login.css";

const Login: React.FC = () => {
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  return (
    <div className="login-page">
      {/* Existing login UI goes here */}
      {/* ... */}

      <button
        type="button"
        className="terms-button"
        onClick={() => setIsTermsOpen(true)}
        aria-haspopup="dialog"
      >
        Terms & conditions
      </button>

      <Modal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        title="Terms and Conditions of Use"
      >
        <p>
          Welcome to Our Platform. By accessing or using our service, you agree to be bound by these terms and conditions. If you disagree with any part of the terms, you may not access the service.
        </p>
        <p>
          This is a placeholder document. The content within this modal is for display purposes only and will be replaced with the official terms of service upon final review by the legal department. Please use this text to verify UI components, layout, and functionality.
        </p>
      </Modal>
    </div>
  );
};

export default Login;
