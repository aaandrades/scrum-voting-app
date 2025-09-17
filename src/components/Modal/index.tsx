import { ReactNode, useEffect, useRef } from "react";
import "./styles.css";

interface ModalProps {
  id?: string;
  open: boolean;
  title: string;
  onClose: () => void;
  onAfterClose?: () => void;
  children: ReactNode;
}

const FOCUSABLE_SELECTORS = [
  'a[href]',
  'area[href]',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'button:not([disabled])',
  'iframe',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]',
  '[tabindex]:not([tabindex="-1"])'
].join(",");

const Modal = ({ id, open, title, onClose, onAfterClose, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const titleIdRef = useRef<string>(id ? `${id}-title` : "modal-title");

  useEffect(() => {
    if (!open) return;

    lastFocusedRef.current = document.activeElement as HTMLElement | null;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
      if (e.key === "Tab") {
        const node = modalRef.current;
        if (!node) return;
        const focusable = Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS));
        if (focusable.length === 0) {
          e.preventDefault();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
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

    const focusFirst = () => {
      const node = modalRef.current;
      if (!node) return;
      const focusable = node.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS);
      if (focusable.length > 0) {
        focusable[0].focus();
      } else {
        node.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    // Defer focus to ensure elements are rendered
    setTimeout(focusFirst, 0);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      if (lastFocusedRef.current) lastFocusedRef.current.focus();
      if (onAfterClose) onAfterClose();
    };
  }, [open, onClose, onAfterClose]);

  if (!open) return null;

  return (
    <div className="modal-overlay" role="presentation">
      <div
        id={id}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleIdRef.current}
        ref={modalRef}
        tabIndex={-1}
      >
        <button
          type="button"
          className="modal__close-btn"
          aria-label="Close modal"
          onClick={onClose}
        >
          ×
        </button>
        <h2 id={titleIdRef.current} className="modal__title">{title}</h2>
        <div className="modal__body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
