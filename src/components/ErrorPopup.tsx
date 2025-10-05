import type { FC } from "react";
import type { ErrorPopupProps } from "../types/ui/components";


const ErrorPopup: FC<ErrorPopupProps> = ({
  title = "⚠️ Erreur",
  selectedStation,
  children,
  onClose,
}) => {
  return (
    <div
      className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/40 backdrop-blur-sm"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="error-title"
    >
      <div className="relative w-96 max-w-[90%] bg-white rounded-lg shadow-lg p-6 animate-fade-in">
        {/* === HEADER === */}
        <header className="flex items-center justify-between mb-4">
          <h3 id="error-title" className="font-bold text-lg text-red-600">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer la fenêtre d’erreur"
            className="text-gray-400 hover:text-gray-600 transition text-xl leading-none"
          >
            ✖
          </button>
        </header>

        {/* === CONTENU === */}
        <section className="text-sm text-gray-700 mb-4 space-y-1">
          {children ? (
            children
          ) : selectedStation ? (
            <>
              <p>
                <span className="font-semibold">Station :</span>{" "}
                #{selectedStation.number}
              </p>
              <p>
                <span className="font-semibold">Contrat :</span>{" "}
                {selectedStation.contract}
              </p>
              <p className="text-red-600 font-medium">
                ❌ Impossible de récupérer les données en temps réel.
              </p>
            </>
          ) : (
            <p className="text-gray-600">
              Impossible de récupérer la station. Sélectionne une autre ville :
            </p>
          )}
        </section>

        {/* === FOOTER === */}
        <footer className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm"
          >
            Fermer
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ErrorPopup;
