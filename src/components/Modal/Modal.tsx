import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  id?: string; // dialog id for aria-controls
}

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selectors = [
    'a[href]',
    'area[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'iframe',
    'object',
    'embed',
    '[contenteditable]',
    '[tabindex]:not([tabindex="-1"])',
  ];
  return Array.from(container.querySelectorAll<HTMLElement>(selectors.join(',')))
    .filter(el => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'));
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, id = 'app-modal' }) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedRef.current = (document.activeElement as HTMLElement) || null;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      } else if (e.key === 'Tab' && dialogRef.current) {
        const focusables = getFocusableElements(dialogRef.current);
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement;

        if (e.shiftKey) {
          if (active === first || !dialogRef.current.contains(active)) {
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

    const timer = window.setTimeout(() => {
      // Prefer focusing the close button; fall back to dialog container
      if (closeBtnRef.current) {
        closeBtnRef.current.focus();
      } else if (dialogRef.current) {
        dialogRef.current.focus();
      }
    }, 0);

    document.addEventListener('keydown', handleKeyDown, true);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('keydown', handleKeyDown, true);
      // Restore focus
      if (previouslyFocusedRef.current) {
        previouslyFocusedRef.current.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const dialog = (
    <div className="modal-overlay" aria-hidden={!isOpen}>
      <div
        ref={dialogRef}
        id={id}
        className="modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-title`}
        tabIndex={-1}
      >
        <div className="modal-header">
          <h2 id={`${id}-title`} className="modal-title">{title}</h2>
          <button
            ref={closeBtnRef}
            type="button"
            className="modal-close"
            aria-label="Close dialog"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );

  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    return createPortal(dialog, document.body);
  }
  return dialog;
};

export default Modal;
