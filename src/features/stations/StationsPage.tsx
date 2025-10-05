import { useState } from "react";
import Papa from "papaparse";

import Map from "./Map";
import Sidebar from "../../components/SideBar";
import ImportControls from "../../components/ImportControls";
import ContractSelect from "../../components/ContractSelect";
import StationDetailsPanel from "../../components/StationDetailsPanel";
import StationPanel from "../../components/StationPanel";
import ErrorPopup from "../../components/ErrorPopup";

import { contracts } from "../../data/contracts";
import { useFavorites } from "../../hooks/useFavorites";
import { useFilters } from "../../hooks/useFilters";
import { useRealtime } from "../../hooks/useRealTime";
import { useAutoRefresh } from "../../hooks/useAutoRefresh";

import { parseStationsCsv } from "../../utils/parseStationsCsv";
import { mapRealtimeToHistoryEntry, mapToStationDetailsModel } from "../../utils/mappers";

import type { CsvStation, StationCsvRow } from "../../types/station";
import type { PanelType } from "../../types/ui";

export default function StationsPage() {
  // === State principal ===
  const [stations, setStations] = useState<CsvStation[]>([]);
  const [selectedStation, setSelectedStation] = useState<{ contract: string; number: number } | null>(null);
  const [contract, setContract] = useState<string>("");
  const [activeContract, setActiveContract] = useState<string>("");
  const [selectedPanel, setSelectedPanel] = useState<PanelType>(null);
  const [filters, setFilters] = useState({ open: false, bikes: false, stands: false });

  // === Hooks ===
  const { realtimeData, fetchRealtime, history, error, setError } = useRealtime();
  const { favorites, toggleFavorite, isFavorite } = useFavorites([]);
  const { applyFilters } = useFilters();

  // === Auto-refresh ===
  useAutoRefresh({
    selectedStation,
    fetchRealtime,
    intervalMs: 90000, // 90 secondes
  });

  // === Derived data ===
  const filteredHistory = applyFilters(history, filters);
  const filteredFavorites = applyFilters(favorites, filters);

  // === Sélection station ===
  const handleSelectStation = (contract: string, number: number) => {
    setSelectedStation({ contract, number });
    setSelectedPanel("station");
    fetchRealtime(contract, number);
  };

  // === Import CSV ===
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // ✅ Vérifie l’extension et le type MIME
    const isCsv =
      file.type === "text/csv" || file.name.toLowerCase().endsWith(".csv");

    if (!isCsv) {
      alert("❌ Le fichier sélectionné doit être un fichier CSV (.csv)");
      event.target.value = ""; // réinitialise le champ input
      return;
    }

    if (!contract) {
      alert("⚠️ Sélectionnez d’abord une ville avant d’importer un fichier CSV.");
      event.target.value = "";
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const parsedStations = parseStationsCsv(
          result.data as StationCsvRow[],
          contract
        );
        setStations(parsedStations);
        setActiveContract(contract);
      },
    });
  };


  return (
    <div className="flex h-screen relative">
      {/* 🧭 Barre latérale */}
      <Sidebar selected={selectedPanel} onSelect={setSelectedPanel} />

      {/* 🗺️ Carte principale */}
      <main className="flex-1 relative bg-gray-100">
        <Map stations={stations} onFetchRealtime={handleSelectStation} contract={activeContract} />

        {/* 🔍 Zone d’import CSV */}
        <ImportControls
          contract={contract}
          setContract={setContract}
          contracts={contracts}
          handleFileUpload={handleFileUpload}
        />

        {/* 📍 Détails d’une station */}
        {selectedPanel === "station" && realtimeData && (
          <StationDetailsPanel
            realtimeData={mapToStationDetailsModel(realtimeData)}
            onClose={() => setSelectedPanel(null)}
            isFavorite={isFavorite(mapRealtimeToHistoryEntry(realtimeData))}
            onToggleFavorite={() => toggleFavorite(mapRealtimeToHistoryEntry(realtimeData))}
            onRefresh={() =>
              selectedStation && fetchRealtime(selectedStation.contract, selectedStation.number)
            }
          />
        )}

        {/* 🕓 Historique */}
        {selectedPanel === "history" && (
          <StationPanel
            type="history"
            list={history}
            filteredList={filteredHistory}
            favorites={favorites}
            filters={filters}
            setFilters={setFilters}
            onFetchRealtime={handleSelectStation}
            toggleFavorite={toggleFavorite}
            onClose={() => setSelectedPanel(null)} // ✅ ajouté ici
          />
        )}

        {selectedPanel === "favorite" && (
          <StationPanel
            type="favorite"
            list={favorites}
            filteredList={filteredFavorites}
            favorites={favorites}
            filters={filters}
            setFilters={setFilters}
            onFetchRealtime={handleSelectStation}
            toggleFavorite={toggleFavorite}
            onClose={() => setSelectedPanel(null)} // ✅ ajouté ici
          />
        )}


        {/* ⚠️ Popup d’erreur */}
        {error && (
          <ErrorPopup selectedStation={selectedStation} onClose={() => setError(false)}>
            <ContractSelect
              value={activeContract}
              onChange={setActiveContract}
              contracts={contracts}
              className="w-full px-3 py-2 border rounded mb-4 text-sm"
              placeholder="-- Choisir une ville --"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setError(false)}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  setError(false);
                  if (selectedStation) {
                    fetchRealtime(activeContract, selectedStation.number);
                  }
                }}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
              >
                Réessayer
              </button>
            </div>
          </ErrorPopup>
        )}
      </main>
    </div>
  );
}
