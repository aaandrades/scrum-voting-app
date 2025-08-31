import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);
  const titleIdRef = useRef(`modal-title-${Math.random().toString(36).slice(2)}`);
  const descIdRef = useRef(`modal-desc-${Math.random().toString(36).slice(2)}`);

  const getFocusableElements = () => {
    const dialog = dialogRef.current;
    if (!dialog) return [] as HTMLElement[];
    const selectors = [
      'a[href]',
      'area[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ].join(',');
    const nodes = Array.from(dialog.querySelectorAll<HTMLElement>(selectors))
      .filter(el => !el.hasAttribute('aria-hidden') && el.offsetParent !== null);
    return nodes;
  };

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedElementRef.current = document.activeElement as HTMLElement;

    const body = document.body;
    const originalOverflow = body.style.overflow;
    body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'Tab') {
        const focusable = getFocusableElements();
        if (focusable.length === 0) {
          e.preventDefault();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement as HTMLElement;
        if (e.shiftKey) {
          if (active === first || active === dialogRef.current) {
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

    window.addEventListener('keydown', handleKeyDown);

    // Focus the first focusable element (or the dialog itself) once opened
    setTimeout(() => {
      const focusable = getFocusableElements();
      (focusable[0] || dialogRef.current)?.focus();
    }, 0);

    return () => {
      body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      previouslyFocusedElementRef.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" aria-hidden="false">
      <div
        className="modal-dialog"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleIdRef.current}
        aria-describedby={descIdRef.current}
        tabIndex={-1}
      >
        <div className="modal-header">
          <h2 id={titleIdRef.current} className="modal-title">{title}</h2>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Close dialog"
          >
            ×
          </button>
        </div>
        <div id={descIdRef.current} className="modal-body">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
