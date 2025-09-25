import React, { useEffect, useRef, useState } from "react";
import "./styles.css";

const Login: React.FC = () => {
  const [isTcOpen, setIsTcOpen] = useState(false);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const FOCUSABLE_SELECTOR =
    'a[href], area[href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])';

  useEffect(() => {
    if (!isTcOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setIsTcOpen(false);
        return;
      }

      if (e.key === "Tab") {
        const root = dialogRef.current;
        if (!root) return;
        const focusables = root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
        if (focusables.length === 0) {
          e.preventDefault();
          return;
        }
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;

        if (e.shiftKey) {
          if (active === first || !root.contains(active)) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (active === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    const focusInitial = () => {
      const root = dialogRef.current;
      if (!root) return;
      const focusables = root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (focusables.length > 0) {
        focusables[0].focus();
      } else {
        root.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Ensure focusing after paint
    const t = window.setTimeout(focusInitial, 0);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(t);
      openerRef.current?.focus();
    };
  }, [isTcOpen]);

  return (
    <section className="login" aria-labelledby="login-title">
      {/* Existing login content goes here */}
      {/* Example structure retained for styling hooks; keep or integrate with your current form */}
      <h1 id="login-title" className="login__title">Welcome</h1>
      <p className="login__description">Please sign in to continue.</p>
      <form className="login__form" aria-label="Login form">
        {/* ...existing fields and actions... */}
      </form>

      <button
        ref={openerRef}
        type="button"
        className="login__tc-btn"
        style={{ backgroundColor: "#ffffff", color: "#000000" }}
        aria-haspopup="dialog"
        aria-controls="terms-dialog"
        onClick={() => setIsTcOpen(true)}
      >
        Terms & conditions
      </button>

      {isTcOpen && (
        <div className="modal-overlay" role="presentation">
          <div
            id="terms-dialog"
            ref={dialogRef}
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="tc-title"
            aria-describedby="tc-body"
            tabIndex={-1}
          >
            <div className="modal__header">
              <h2 id="tc-title" className="modal__title">Terms and Conditions of Use</h2>
              <button
                type="button"
                className="modal__close"
                aria-label="Close"
                onClick={() => setIsTcOpen(false)}
              >
                ×
              </button>
            </div>
            <div id="tc-body" className="modal__body">
              <p>
                Welcome to Our Platform. By accessing or using our service, you agree to be bound by these terms and conditions. If you disagree with any part of the terms, you may not access the service. This is a placeholder document.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Login;
