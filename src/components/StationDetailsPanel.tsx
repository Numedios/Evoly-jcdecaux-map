import type { FC } from "react";
import type { JCDecauxStationRealtime } from "../types/api/jcdecaux";
import StationDetails from "./StationsDetails";

interface StationDetailsPanelProps {
  realtimeData: JCDecauxStationRealtime | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onRefresh?: () => void;
}

const StationDetailsPanel: FC<StationDetailsPanelProps> = ({
  realtimeData,
  onClose,
  isFavorite,
  onToggleFavorite,
  onRefresh,
}) => {
  if (!realtimeData) return null;

  return (
    <>
      {/* 💻 Desktop */}
      <div className="absolute top-24 left-12 w-96 bg-white rounded-lg shadow-lg z-[9999] hidden md:block">
        <StationDetails
          realtimeData={realtimeData}
          onClose={onClose}
          isFavorite={isFavorite}
          onToggleFavorite={onToggleFavorite}
          onRefresh={onRefresh}
        />
      </div>

      {/* 📱 Mobile */}
      <div className="absolute top-[80px] left-1 right-2 w-[85%] bg-white rounded-sm shadow z-[9999] p-1 md:hidden max-h-[67vh] overflow-y-auto">
        <StationDetails
          realtimeData={realtimeData}
          onClose={onClose}
          isFavorite={isFavorite}
          onToggleFavorite={onToggleFavorite}
          onRefresh={onRefresh}
        />
      </div>
    </>
  );
};

export default StationDetailsPanel;
