import React, { useEffect, useRef } from 'react';
import './Modal.css';

interface ModalProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const focusableSelectors = [
  'a[href]',
  'area[href]',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'button:not([disabled])',
  'iframe',
  'object',
  'embed',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]',
].join(',');

export default function Modal({ id, isOpen, onClose, title, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    // Focus the close button on open
    const to = window.setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 0);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        const container = modalRef.current;
        if (!container) return;
        const focusable = Array.from(container.querySelectorAll<HTMLElement>(focusableSelectors)).filter(el => !el.hasAttribute('disabled') && el.tabIndex !== -1);
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const current = document.activeElement as HTMLElement | null;

        if (!e.shiftKey && current === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && current === first) {
          e.preventDefault();
          last.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(to);
      document.removeEventListener('keydown', handleKeyDown);
      // Restore focus to previously focused element
      previouslyFocused?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const headingId = `${id}-title`;

  const onOverlayMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    // Optional: close when clicking the overlay (not required by AC, but non-intrusive)
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onMouseDown={onOverlayMouseDown}>
      <div
        id={id}
        className="modal"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
      >
        <div className="modal__header">
          <h2 id={headingId} className="modal__title">{title}</h2>
          <button
            type="button"
            className="modal__close"
            aria-label="Close dialog"
            onClick={onClose}
            ref={closeBtnRef}
          >
            ×
          </button>
        </div>
        <div className="modal__body">{children}</div>
      </div>
    </div>
  );
}
