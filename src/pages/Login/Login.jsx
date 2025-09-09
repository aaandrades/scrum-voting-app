import React from 'react';
import TermsConditionsEntry from '../../components/TermsConditions/TermsConditionsEntry';

export default function Login() {
  return (
    <div className="login-page">
      {/* Existing login form and UI goes here */}

      {/* Bottom-right Terms & Conditions trigger + modal */}
      <TermsConditionsEntry />
    </div>
  );
}
