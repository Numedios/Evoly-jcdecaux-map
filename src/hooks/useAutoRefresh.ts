import { useEffect, useRef } from "react";

interface UseAutoRefreshOptions {
  selectedStation: { contract: string; number: number } | null;
  fetchRealtime: (contract: string, number: number) => void;
  intervalMs?: number; // Par défaut : 90s
}
/**
 * 🔄 Rafraîchit automatiquement les données en temps réel
 * d'une station sélectionnée à intervalle régulier.
 */
export function useAutoRefresh({
  selectedStation,
  fetchRealtime,
  intervalMs = 90_000,
}: UseAutoRefreshOptions) {
  const lastStationRef = useRef<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!selectedStation) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    const stationKey = `${selectedStation.contract}-${selectedStation.number}`;
    if (lastStationRef.current === stationKey) return;

    lastStationRef.current = stationKey;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      console.log("⏱️ Refresh automatique JCDecaux →", stationKey);
      fetchRealtime(selectedStation.contract, selectedStation.number);
    }, intervalMs);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [selectedStation, fetchRealtime, intervalMs]);
}
