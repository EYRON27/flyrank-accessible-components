import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  triggerRef,
  children,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation & Focus Trapping
  useEffect(() => {
    if (!isOpen) return;

    // Save active element to return focus later
    const previousActiveElement = document.activeElement;

    // Focus first focusable element in modal
    const focusableSelector =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    // Tiny delay to ensure modal is rendered
    const focusTimer = setTimeout(() => {
      if (modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(focusableSelector);
        if (focusableElements.length > 0) {
          focusableElements[0].focus();
        }
      }
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      // Close on Escape
      if (e.key === "Escape") {
        onClose();
        return;
      }

      // Trap Tab
      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = Array.from(
          modalRef.current.querySelectorAll<HTMLElement>(focusableSelector)
        );

        if (focusableElements.length === 0) return;

        const firstEl = focusableElements[0];
        const lastEl = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          // Backward tab: Shift + Tab
          if (document.activeElement === firstEl) {
            lastEl.focus();
            e.preventDefault();
          }
        } else {
          // Forward tab: Tab
          if (document.activeElement === lastEl) {
            firstEl.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup: Restore focus to trigger
    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
      if (triggerRef.current) {
        triggerRef.current.focus();
      } else if (previousActiveElement instanceof HTMLElement) {
        previousActiveElement.focus();
      }
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="custom-modal-title"
        aria-describedby="custom-modal-desc"
        className="w-full max-w-lg glass-panel rounded-2xl p-6 relative flex flex-col gap-4 animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-color pb-3">
          <h2 id="custom-modal-title" className="text-lg font-bold text-white m-0">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 rounded-xl bg-card-bg border border-border-color hover:bg-card-hover text-gray-400 hover:text-white transition duration-200"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content Body */}
        <div id="custom-modal-desc" className="text-sm text-gray-400 leading-relaxed py-2">
          {children}
        </div>

        {/* Footer actions */}
        <div className="flex justify-end gap-3 border-t border-border-color pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-border-color bg-card-bg text-gray-400 hover:text-white text-xs font-bold transition duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-white text-xs font-bold transition duration-200 shadow-md shadow-accent-glow"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
