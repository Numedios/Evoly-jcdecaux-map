import { useState } from "react";
import { fetchStationInfo } from "../services/jcdecaux";
import { mapRealtimeToHistoryEntry } from "../utils/mappers";
import type { HistoryEntry } from "../types/history";
import type { JCDecauxStationRealtime } from "../types/api/jcdecaux";

export function useRealtime() {
  const [realtimeData, setRealtimeData] = useState<JCDecauxStationRealtime | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [error, setError] = useState(false);

  const fetchRealtime = async (contract: string, stationNumber: number) => {
    try {
      const data = await fetchStationInfo(contract, stationNumber);
      if (!data) throw new Error("Pas de données");

      setRealtimeData(data);

      const newEntry = mapRealtimeToHistoryEntry(data);
      setHistory((prev) => {
        const exists = prev.some(
          (h) => h.number === newEntry.number && h.contract === newEntry.contract
        );
        if (exists) return prev;
        return [newEntry, ...prev].slice(0, 100);
      });
    } catch {
      setError(true);
    }
  };

  return { realtimeData, fetchRealtime, history, error, setError };
}
