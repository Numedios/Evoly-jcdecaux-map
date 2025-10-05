import { useState } from "react";
import type { HistoryEntry } from "../types/history";



export function useFavorites(initial: HistoryEntry[] = []) {
  const [favorites, setFavorites] = useState<HistoryEntry[]>(initial);

  const toggleFavorite = (station: HistoryEntry) => {
    setFavorites((prev) => {
      const exists = prev.some(f => f.number === station.number && f.contract === station.contract);
      return exists
        ? prev.filter(f => !(f.number === station.number && f.contract === station.contract))
        : [...prev, station];
    });
  };

  const isFavorite = (station: HistoryEntry) =>
    favorites.some(f => f.number === station.number && f.contract === station.contract);

  return { favorites, toggleFavorite, isFavorite };
}
