// src/types/ui/components.ts
import type { ReactNode } from "react";
import type { PanelType } from ".";
import type { HistoryEntry } from "../history";
import type { CsvStation } from "../station";
import type { Contract } from "../contract";
import type { Filters } from "../data/filters";
import type { JCDecauxStationRealtime } from "../api/jcdecaux";

/* ============================================================
   🧩 1. COMPOSANTS GÉNÉRIQUES (modales, panneaux, sidebar)
   ============================================================ */

export interface PanelProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
  size?: "desktop" | "mobile";
}

export interface ModalProps {
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  onClose: () => void;
}

export interface ErrorPopupProps {
  title?: string;
  selectedStation?: { number: number; contract: string } | null;
  children?: ReactNode;
  onClose: () => void;
}

export interface SidebarProps {
  selected: PanelType | null;
  onSelect: (panel: "history" | "favorite") => void;
}

/* ============================================================
   ⚙️ 2. COMPOSANTS DE CONTRÔLE ET FILTRAGE
   ============================================================ */

export interface FilterButtonsProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  list: HistoryEntry[];
  size?: "desktop" | "mobile";
}

export interface ImportControlsProps {
  contract: string;
  setContract: (value: string) => void;
  contracts: Contract[];
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface MapProps {
  stations: CsvStation[];
  onFetchRealtime?: (contract: string, stationNumber: number) => void;
  contract: string;
}

/* ============================================================
   🚲 3. COMPOSANTS LIÉS AUX STATIONS
   ============================================================ */

export interface StationListProps {
  list: HistoryEntry[];
  favorites: HistoryEntry[];
  onFetchRealtime: (contract: string, number: number) => void;
  toggleFavorite: (station: HistoryEntry) => void;
  size?: "desktop" | "mobile";
}

export interface StationDetailsProps {
  realtimeData: JCDecauxStationRealtime;
  onClose: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  onRefresh?: () => void;
}

export interface StationDetailsPanelProps {
  realtimeData: JCDecauxStationRealtime | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onRefresh?: () => void;
}

export interface StationPanelProps {
  type: "history" | "favorite";
  list: HistoryEntry[];
  filteredList: HistoryEntry[];
  favorites: HistoryEntry[];
  filters: Filters;
  setFilters: (filters: Filters) => void;
  onFetchRealtime: (contract: string, number: number) => void;
  toggleFavorite: (station: HistoryEntry) => void;
  onClose: () => void;
}
