import { useEffect, useRef } from "react";
import "./styles.css";

interface ModalProps {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const FOCUSABLE_SELECTORS = [
  'a[href]','button:not([disabled])','textarea','input[type="text"]','input[type="search"]','input[type="radio"]','input[type="checkbox"]','select','[tabindex]:not([tabindex="-1"])'
].join(",");

const Modal = ({ id, isOpen, onClose, title, children }: ModalProps) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const titleIdRef = useRef<string>(`modal-title-${Math.random().toString(36).slice(2)}`);

  useEffect(() => {
    if (!isOpen) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    const focusFirstElement = () => {
      const focusables = dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS);
      const first = focusables[0] || dialog;
      first.focus();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "Tab") {
        const focusables = dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS);
        if (focusables.length === 0) {
          e.preventDefault();
          dialog.focus();
          return;
        }
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    // Focus and listeners
    focusFirstElement();
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (previouslyFocused && typeof previouslyFocused.focus === "function") {
        previouslyFocused.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" role="presentation">
      <div
        id={id}
        ref={dialogRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleIdRef.current}
        tabIndex={-1}
      >
        <button
          type="button"
          className="modal__close"
          aria-label="Close dialog"
          onClick={onClose}
        >
          ×
        </button>
        <h2 id={titleIdRef.current} className="modal__title">{title}</h2>
        <div className="modal__body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
