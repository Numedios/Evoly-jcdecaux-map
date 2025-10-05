import type { FC } from "react";
import type { FilterButtonsProps } from "../types/ui/components";
import type { Filters } from "../types/data/filters";

const FilterButtons: FC<FilterButtonsProps> = ({
  filters,
  setFilters,
  list,
  size = "desktop",
}) => {
  const isMobile = size === "mobile";

  const baseButton =
    "flex items-center gap-1 rounded-full font-medium transition whitespace-nowrap";
  const activeButton = "bg-blue-500 text-white shadow-sm";
  const inactiveButton = "bg-gray-100 text-gray-700 hover:bg-gray-200";

  const toggle = (key: keyof Filters) =>
    setFilters({ ...filters, [key]: !filters[key] });

  const textSize = isMobile ? "text-[11px] px-2 py-1" : "text-sm px-3 py-1.5";

  return (
    <div
      className={`flex flex-col gap-2 mb-3 ${
        isMobile ? "text-xs" : "text-sm"
      }`}
    >
      {/* 🧩 Label Filtres */}
      <div className="flex items-center justify-between">
        <span
          className={`font-semibold text-gray-700 ${
            isMobile ? "text-[12px]" : "text-base"
          }`}
        >
           Filtres
        </span>
        <span className="text-gray-500 text-xs">
          {list.length} station{list.length > 1 ? "s" : ""}
        </span>
      </div>

      {/* Boutons de filtre */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => toggle("open")}
          className={`${baseButton} ${textSize} ${
            filters.open ? activeButton : inactiveButton
          }`}
        >
          🚦 Ouvertes
        </button>

        <button
          onClick={() => toggle("bikes")}
          className={`${baseButton} ${textSize} ${
            filters.bikes ? activeButton : inactiveButton
          }`}
        >
          🚲 Vélos
        </button>

        <button
          onClick={() => toggle("stands")}
          className={`${baseButton} ${textSize} ${
            filters.stands ? activeButton : inactiveButton
          }`}
        >
          📍 Places
        </button>
      </div>
    </div>
  );
};

export default FilterButtons;
