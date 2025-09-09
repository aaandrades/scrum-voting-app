import React, { useEffect, useRef } from 'react';
import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  id?: string;
}

export default function Modal({ isOpen, onClose, title, children, id }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const titleId = `${id || 'modal'}-title`;

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose?.();
        return;
      }
      if (e.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener('keydown', onKeyDown);
    setTimeout(() => closeRef.current?.focus(), 0);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      previouslyFocused && previouslyFocused.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const onOverlayMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      onClose?.();
    }
  };

  return (
    <div className="modal-overlay" ref={overlayRef} onMouseDown={onOverlayMouseDown}>
      <div
        className="modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        id={id}
        ref={dialogRef}
        tabIndex={-1}
      >
        <div className="modal-header">
          <h2 id={titleId} className="modal-title">{title}</h2>
          <button
            type="button"
            className="modal-close"
            aria-label="Close"
            onClick={onClose}
            ref={closeRef}
          >
            ×
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
