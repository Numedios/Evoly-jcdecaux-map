import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";
import type { Station } from "../../types/station";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import type { LatLngExpression, LatLngBoundsExpression } from "leaflet";

// Point par défaut (Amiens)
const defaultCenter: LatLngExpression = [49.8941, 2.2958];

// Fix icône Leaflet
const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface MapProps {
  stations: Station[];
}

// 🔹 Composant utilitaire pour recadrer la carte
function FitBounds({ stations }: { stations: Station[] }) {
  const map = useMap();

  useEffect(() => {
    if (stations.length > 0) {
      const bounds: LatLngBoundsExpression = stations.map((s) => [s.lat, s.lng]);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [stations, map]);

  return null;
}

export default function Map({ stations }: MapProps) {
  return (
    <MapContainer center={defaultCenter} zoom={13} className="h-full w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Markers du CSV */}
      {stations.map((station) => (
        <Marker
          key={station.number}
          position={[station.lat, station.lng]}
          icon={icon}
        >
          <Popup>
            <strong>{station.name}</strong>
            <br />
            {station.address}
          </Popup>
        </Marker>
      ))}

      {/* 🔹 Recentrage auto */}
      <FitBounds stations={stations} />
    </MapContainer>
  );
}
