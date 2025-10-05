import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useRef } from "react";
import L, { type LatLngExpression, type LatLngBoundsExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

import type { CsvStation } from "../../types/station";
import type { MapProps } from "../../types/ui/components";

// === Constantes ===
const DEFAULT_CENTER: LatLngExpression = [49.8941, 2.2958];

const DEFAULT_ICON = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});



// Étend Marker pour y ajouter un timer interne
interface MarkerWithHover extends L.Marker {
  _hoverTimer?: ReturnType<typeof setTimeout>;
}

// === Composant utilitaire : recadrer la carte selon les stations ===
function FitBounds({ stations }: { stations: CsvStation[] }) {
  const map = useMap();

  useEffect(() => {
    if (stations.length === 0) return;

    const bounds: LatLngBoundsExpression = stations.map(({ lat, lng }) => [lat, lng]);
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [stations, map]);

  return null;
}

// === Composant principal ===
export default function Map({ stations, onFetchRealtime, contract }: MapProps) {
  // On garde une référence de tous les marqueurs pour gérer les popups
  const markerRefs = useRef<Record<number, MarkerWithHover | null>>({});

  return (
    <MapContainer center={DEFAULT_CENTER} zoom={13} className="h-full w-full">
      {/* Couche de fond OpenStreetMap */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Markers pour chaque station */}
      {stations.map((station) => {
        let isInsidePopup = false;

        return (
          <Marker
            key={station.number}
            position={[station.lat, station.lng]}
            icon={DEFAULT_ICON}
            ref={(ref) => {
              markerRefs.current[station.number] = ref as MarkerWithHover;
            }}
            eventHandlers={{
              // --- Survol du marker ---
              mouseover: () => {
                const marker = markerRefs.current[station.number];
                if (!marker) return;

                marker._hoverTimer = setTimeout(() => marker.openPopup(), 100);
              },

              // --- Sortie du marker ---
              mouseout: () => {
                const marker = markerRefs.current[station.number];
                if (!marker) return;

                if (marker._hoverTimer) clearTimeout(marker._hoverTimer);
                setTimeout(() => {
                  if (!isInsidePopup) marker.closePopup();
                }, 200);
              },

              // --- Clic direct sur le marker ---
              click: () => onFetchRealtime?.(contract, station.number),

              // --- Interaction dans le popup ---
              popupopen: () => {
                const marker = markerRefs.current[station.number];
                const popupEl = marker?.getPopup()?.getElement();
                if (!popupEl || !marker) return;

                const handleEnter = () => (isInsidePopup = true);
                const handleLeave = () => {
                  isInsidePopup = false;
                  marker.closePopup();
                };
                const handleClick = () => onFetchRealtime?.(contract, station.number);

                popupEl.addEventListener("mouseenter", handleEnter);
                popupEl.addEventListener("mouseleave", handleLeave);
                popupEl.addEventListener("click", handleClick);

                // 🔹 Nettoyage des listeners quand le popup se ferme
                marker.once("popupclose", () => {
                  popupEl.removeEventListener("mouseenter", handleEnter);
                  popupEl.removeEventListener("mouseleave", handleLeave);
                  popupEl.removeEventListener("click", handleClick);
                });
              },
            }}
          >
            <Popup>
              <div className="cursor-pointer select-none">
                <strong>{station.name}</strong>
                <br />
                {station.address}
              </div>
            </Popup>
          </Marker>
        );
      })}

      <FitBounds stations={stations} />
    </MapContainer>
  );
}
