import { useEffect, useRef } from "react";
import "./styles.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  id?: string;
}

const Modal = ({ isOpen, onClose, title, children, id = "app-modal" }: ModalProps) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocusedEl = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedEl.current = document.activeElement as HTMLElement;

    // Focus close button on open
    const t = window.setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 0);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusableSelectors = [
          'a[href]',
          'area[href]',
          'input:not([disabled])',
          'select:not([disabled])',
          'textarea:not([disabled])',
          'button:not([disabled])',
          'iframe',
          'object',
          'embed',
          '[contenteditable]',
          '[tabindex]:not([tabindex="-1"])',
        ];
        const focusables = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(focusableSelectors.join(','))
        ).filter(el => el.offsetParent !== null);

        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", handleKeyDown);
      // Restore focus to previously focused element after close
      previouslyFocusedEl.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const onOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  const titleId = `${id}-title`;

  return (
    <div
      className="modal-overlay"
      ref={overlayRef}
      onClick={onOverlayClick}
      aria-hidden={!isOpen}
    >
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        id={id}
        ref={dialogRef}
      >
        <div className="modal-header">
          <h2 id={titleId} className="modal-title">{title}</h2>
          <button
            ref={closeBtnRef}
            className="modal-close"
            type="button"
            aria-label="Close Terms and Conditions"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
