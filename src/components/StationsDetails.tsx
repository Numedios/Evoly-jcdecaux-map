import { useEffect, useState } from "react";
import type { JCDecauxStationRealtime } from "../types/api/jcdecaux";

interface StationDetailsProps {
  realtimeData: JCDecauxStationRealtime | null;
  onClose: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  onRefresh?: () => void;
}

export default function StationDetails({
  realtimeData,
  onClose,
  isFavorite,
  onToggleFavorite,
  onRefresh,
}: StationDetailsProps) {
  const [showBikeDetails, setShowBikeDetails] = useState(false);

  // 🪶 Debug utile
  useEffect(() => {
    if (realtimeData) console.log("📡 Station:", realtimeData);
  }, [realtimeData]);

  // 🧩 État de chargement
  if (!realtimeData) {
    return (
      <div className="flex flex-col h-full bg-white border-r shadow-md items-center justify-center p-6 text-gray-500 text-sm">
        <p>Chargement des données de la station...</p>
      </div>
    );
  }

  // 🧭 Données déstructurées
  const {
    name,
    address,
    status,
    banking,
    bonus,
    totalStands,
    lastUpdate,
  } = realtimeData;

  const {
    availabilities: {
      bikes,
      stands,
      mechanicalBikes,
      electricalBikes,
      electricalInternalBatteryBikes,
      electricalRemovableBatteryBikes,
    },
    capacity,
  } = totalStands;

  return (
    <div className="flex flex-col h-full bg-white border-r shadow-md">
      {/* === HEADER === */}
      <div className="bg-gray-400 text-white px-4 py-3 text-sm md:text-base">
        {/* Nom + adresse scrollables */}
        <div className="overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 mb-2">
          <h3 className="text-base md:text-lg font-semibold block">{name}</h3>
          <p className="text-[10px] md:text-xs opacity-80 block">{address}</p>
        </div>

        {/* Ligne du bas : statut + boutons */}
        <div className="flex items-center justify-between">
          <span
            className={`px-2 py-0.5 text-[10px] md:text-xs font-semibold rounded-full ${
              status === "OPEN" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {status === "OPEN" ? "Ouverte" : "Fermée"}
          </span>

          <div className="flex items-center gap-1 md:gap-2">
            {/* Favori */}
            {onToggleFavorite && (
              <button
                onClick={onToggleFavorite}
                title="Ajouter ou retirer des favoris"
                className="px-2 py-0.5 text-[12px] md:text-xs rounded bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
              >
                {isFavorite ? "★" : "☆"}
              </button>
            )}

            {/* Rafraîchir */}
            {onRefresh && (
              <button
                onClick={onRefresh}
                title="Rafraîchir les données"
                className="px-2 py-0.5 text-[12px] md:text-xs rounded bg-blue-100 text-blue-600 hover:bg-blue-200"
              >
                🔄
              </button>
            )}

            {/* Fermer */}
            <button
              onClick={onClose}
              title="Fermer le panneau"
              className="ml-1 px-2 py-0.5 text-[12px] md:text-xs rounded bg-red-100 text-red-600 hover:bg-red-200"
            >
              ✖
            </button>
          </div>
        </div>
      </div>

      {/* === CONTENU === */}
      <div className="flex-1 overflow-y-auto p-2 md:p-4 space-y-3 text-xs md:text-sm">
        {/* 💳 Bonus / Paiement */}
        <div className="flex flex-wrap gap-1 md:gap-2">
          {banking && (
            <span className="px-2 py-0.5 text-[10px] md:text-xs rounded-full bg-blue-100 text-blue-700 font-medium">
              💳 Paiement CB
            </span>
          )}
          {bonus && (
            <span className="px-2 py-0.5 text-[10px] md:text-xs rounded-full bg-yellow-100 text-yellow-700 font-medium">
              ⭐ Station bonus
            </span>
          )}
        </div>

        {/* 🚲 Vélos disponibles */}
        <section
          onClick={() => setShowBikeDetails((prev) => !prev)}
          className="bg-blue-50 p-3 rounded-lg cursor-pointer hover:bg-blue-100 transition"
        >
          <p className="text-xl md:text-2xl font-bold text-blue-600">{bikes}</p>
          <p className="text-gray-600 text-[11px] md:text-sm">Vélos disponibles</p>

          {showBikeDetails && (
            <div className="mt-2 text-[10px] md:text-xs bg-white border rounded p-2 text-left space-y-1">
              <p>🔧 Mécaniques : {mechanicalBikes}</p>
              <p>⚡ Électriques : {electricalBikes}</p>
              <p className="text-gray-500">
                Batterie interne : {electricalInternalBatteryBikes}, Amovible :{" "}
                {electricalRemovableBatteryBikes}
              </p>
            </div>
          )}
        </section>

        {/* 🅿️ Places libres */}
        <section className="bg-green-50 p-3 rounded-lg hover:bg-green-100 transition">
          <p className="text-xl md:text-2xl font-bold text-green-600">{stands}</p>
          <p className="text-gray-600 text-[11px] md:text-sm">Places libres</p>
        </section>

        {/* ⚙️ Capacité */}
        <section className="bg-gray-50 p-3 rounded-lg">
          <p className="text-lg md:text-2xl font-bold text-gray-700">{capacity}</p>
          <p className="text-gray-600 text-[11px] md:text-sm">Capacité totale</p>
        </section>

        {/* ⏱️ Dernière mise à jour */}
        <section className="bg-yellow-50 p-3 rounded-lg">
          <p className="text-sm md:text-lg font-semibold text-yellow-700">
            {new Date(lastUpdate).toLocaleTimeString()}
          </p>
          <p className="text-gray-600 text-[11px] md:text-sm">
            ⏱️ Dernière mise à jour
          </p>
        </section>
      </div>
    </div>
  );
}
