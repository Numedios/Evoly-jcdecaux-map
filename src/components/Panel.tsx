import type { FC } from "react";
import type { PanelProps } from "../types/ui/components";



const Panel: FC<PanelProps> = ({
  title,
  onClose,
  children,
  size = "desktop",
}) => {
  const isDesktop = size === "desktop";

  const wrapperClass = `
    absolute z-[9999] bg-white shadow-lg rounded-lg 
    ${isDesktop ? "top-24 left-12 w-96 p-4 hidden md:block" : "top-20 left-2 right-2 w-[90%] p-2 md:hidden"}
  `;

  const headerClass = `flex items-center justify-between ${
    isDesktop ? "mb-5" : "mb-3"
  }`;

  const titleClass = isDesktop ? "font-bold text-base" : "font-semibold text-sm";
  const closeBtnClass = `
    text-gray-400 hover:text-gray-600 transition 
    ${isDesktop ? "text-base" : "text-xs"}
  `;

  return (
    <div className={wrapperClass}>
      {/* === HEADER === */}
      <div className={headerClass}>
        <h3 className={titleClass}>{title}</h3>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer le panneau"
          className={closeBtnClass}
        >
          ✖
        </button>
      </div>

      {/* === CONTENU === */}
      <div className={isDesktop ? "max-h-[70vh] overflow-y-auto" : "max-h-[60vh] overflow-y-auto"}>
        {children}
      </div>
    </div>
  );
};

export default Panel;
