import type { FC } from "react";
import type { ModalProps } from "../types/ui/components";


const Modal: FC<ModalProps> = ({ title, children, footer, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/40 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-96 max-w-[90%] bg-white rounded-lg shadow-lg p-6 animate-fade-in">
        {/* === Header === */}
        <header className="flex items-center justify-between mb-4">
          <h3 id="modal-title" className="font-bold text-lg text-gray-800">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer la fenêtre"
            className="text-gray-400 hover:text-gray-600 transition text-xl leading-none"
          >
            ✖
          </button>
        </header>

        {/* === Contenu === */}
        <section className="mb-4 text-sm text-gray-700">{children}</section>

        {/* === Footer === */}
        {footer && (
          <footer className="flex justify-end gap-2 border-t pt-3 mt-3">
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
};

export default Modal;
