import type { FC } from "react";
import type { SidebarProps } from "../types/ui/components";


const Sidebar: FC<SidebarProps> = ({ selected, onSelect }) => {
  const baseClass =
    "p-2 rounded transition hover:bg-gray-100 flex items-center justify-center text-xl";
  const activeClass = "bg-blue-100 text-blue-600";

  return (
    <aside
      className="w-16 bg-white border-r shadow flex flex-col items-center py-4 gap-4 z-50"
      aria-label="Navigation latérale"
    >
      {/* 🕑 Historique */}
      <button
        type="button"
        onClick={() => onSelect("history")}
        title="Historique"
        aria-pressed={selected === "history"}
        className={`${baseClass} ${selected === "history" ? activeClass : ""}`}
      >
        🕑
      </button>

      {/* ⭐ Favoris */}
      <button
        type="button"
        onClick={() => onSelect("favorite")}
        title="Favoris"
        aria-pressed={selected === "favorite"}
        className={`${baseClass} ${selected === "favorite" ? activeClass : ""}`}
      >
        ⭐
      </button>
    </aside>
  );
};

export default Sidebar;
