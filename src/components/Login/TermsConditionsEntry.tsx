import React, { useEffect, useState } from 'react';
import Modal from '../Modal/Modal';

const TermsConditionsEntry: React.FC = () => {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  // Ensure Escape closes the modal (in addition to any built-in Modal handling)
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="login__terms-button"
        onClick={onOpen}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="terms-conditions-dialog"
      >
        Terms & conditions
      </button>

      <Modal
        id="terms-conditions-dialog"
        isOpen={open}
        onClose={onClose}
        title="Terms and Conditions of Use"
      >
        <p>
          Welcome to Our Platform. By accessing or using our service, you agree to be bound by these terms and conditions. If you disagree with any part of the terms, you may not access the service.
        </p>
        <p>
          This is a placeholder document. The content within this modal is for display purposes only and will be replaced with the official terms of service upon final review by the legal department. Please use this text to verify UI components, layout, and functionality.
        </p>
      </Modal>
    </>
  );
};

export default TermsConditionsEntry;
