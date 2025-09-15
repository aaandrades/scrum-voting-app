import React from 'react';
import TermsConditionsEntry from './TermsConditionsEntry';
import './Login.css';

const Login: React.FC = () => {
  return (
    <div className="login">
      {/* Existing login UI goes here */}
      {/* ... */}

      {/* Terms & Conditions trigger and modal */}
      <TermsConditionsEntry />
    </div>
  );
};

export default Login;
