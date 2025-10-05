import type { Filters } from "../types/data/filters";
import type { HistoryEntry } from "../types/history";


export function useFilters() {
  const applyFilters = (list: HistoryEntry[], filters: Filters) => {
    return list.filter((h) => {
      if (filters.open && h.status !== "OPEN") return false;
      if (filters.bikes && h.bikes <= 0) return false;
      if (filters.stands && h.stands <= 0) return false;
      return true;
    });
  };

  return { applyFilters };
}
