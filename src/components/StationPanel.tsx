import type { FC } from "react";
import Panel from "./Panel";
import FilterButtons from "./FilterButtons";
import StationList from "./StationList";
import type { StationPanelProps } from "../types/ui/components";

const StationPanel: FC<StationPanelProps> = ({
  type,
  list,
  filteredList,
  favorites,
  filters,
  setFilters,
  onFetchRealtime,
  toggleFavorite,
  onClose,
}) => {
  const title = type === "history" ? "🕑 Historique" : "⭐ Favoris";

  const renderContent = (size: "desktop" | "mobile") => (
    <>
      <FilterButtons filters={filters} setFilters={setFilters} list={list} size={size} />
      <StationList
        list={filteredList}
        favorites={favorites}
        onFetchRealtime={onFetchRealtime}
        toggleFavorite={toggleFavorite}
        size={size}
      />
    </>
  );

  return (
    <>
      {/* 💻 Desktop */}
      <Panel title={title} onClose={onClose} size="desktop">
        {renderContent("desktop")}
      </Panel>

      {/* 📱 Mobile */}
      <Panel title={title} onClose={onClose} size="mobile">
        {renderContent("mobile")}
      </Panel>
    </>
  );
};

export default StationPanel;
