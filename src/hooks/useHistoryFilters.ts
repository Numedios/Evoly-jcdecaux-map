import { useState, useMemo } from "react";
import type { HistoryEntry } from "../types/history";

export function useHistoryFilters(history: HistoryEntry[]) {
  const [showOnlyOpen, setShowOnlyOpen] = useState(false);
  const [showOnlyWithBikes, setShowOnlyWithBikes] = useState(false);
  const [showOnlyWithStands, setShowOnlyWithStands] = useState(false);

  const filteredHistory = useMemo(() => {
    return history.filter((h) => {
      if (showOnlyOpen && h.status !== "OPEN") return false;
      if (showOnlyWithBikes && h.bikes <= 0) return false;
      if (showOnlyWithStands && h.stands <= 0) return false;
      return true;
    });
  }, [history, showOnlyOpen, showOnlyWithBikes, showOnlyWithStands]);

  return {
    filteredHistory,
    showOnlyOpen,
    setShowOnlyOpen,
    showOnlyWithBikes,
    setShowOnlyWithBikes,
    showOnlyWithStands,
    setShowOnlyWithStands,
  };
}
