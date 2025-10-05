import type { FC } from "react";
import type { StationListProps } from "../types/ui/components";


const StationList: FC<StationListProps> = ({
  list,
  favorites,
  onFetchRealtime,
  toggleFavorite,
  size = "desktop",
}) => {
  const isDesktop = size === "desktop";

  const containerClass = `space-y-1 overflow-y-auto ${
    isDesktop ? "max-h-[60vh]" : "max-h-[40vh]"
  }`;

  const itemClass = `bg-white rounded shadow-sm flex justify-between items-center hover:bg-blue-50 transition ${
    isDesktop ? "px-3 py-2 text-sm" : "px-2 py-1 text-xs"
  }`;

  return (
    <ul className={containerClass}>
      {list.length === 0 && (
        <li className="text-center text-gray-400 italic py-2">
          Aucune station à afficher
        </li>
      )}

      {list.map((station) => {
        const isFav = favorites.some(
          (f) => f.number === station.number && f.contract === station.contract
        );

        return (
          <li key={`${station.contract}-${station.number}`} className={itemClass}>
            {/* Nom station */}
            <button
              onClick={() => onFetchRealtime(station.contract, station.number)}
              className="cursor-pointer flex-1 text-left truncate hover:text-blue-600 transition"
            >
              #{station.number} — {station.name}
            </button>

            {/* Favori */}
            <button
              onClick={() => toggleFavorite(station)}
              title={isFav ? "Retirer des favoris" : "Ajouter aux favoris"}
              className={`ml-2 transition-transform hover:scale-110 ${
                isFav ? "text-yellow-500" : "text-gray-400"
              }`}
            >
              {isFav ? "★" : "☆"}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default StationList;
