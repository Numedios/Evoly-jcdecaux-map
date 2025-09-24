// src/features/stations/Map.tsx
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { LatLngExpression } from "leaflet";

export default function Map() {
  // Exemple : Paris
  const position: LatLngExpression = [48.8566, 2.3522];

  return (
    <MapContainer
      center={position}
      zoom={13}
      className="h-full w-full"
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={position}>
        <Popup>📍 Exemple : Paris</Popup>
      </Marker>
    </MapContainer>
  );
}
