import type { RealtimeSummary } from "../types/station"; // API brut simplifié
import type { HistoryEntry } from "../types/history";
import { contracts } from "../data/contracts";
import type { JCDecauxStationRealtime } from "../types/api/jcdecaux";

// 🔹 Mapper API → Historique
export function mapRealtimeToHistoryEntry(data: RealtimeSummary): HistoryEntry {
  return {
    number: data.number,
    name: data.name,
    contract: data.contractName,
    adress: data.address,
    country:
      contracts.find((c) => c.name === data.contractName)?.country_code || "??",
    date: new Date().toISOString(),
    status: data.status,
    bikes: data.totalStands.availabilities.bikes,
    stands: data.totalStands.availabilities.stands,
  };
}

// 🔹 Mapper API complet → UI (station détaillée)
export function mapToStationDetailsModel(raw: JCDecauxStationRealtime): JCDecauxStationRealtime {
  return {
    number: raw.number,
    contractName: raw.contractName,
    name: raw.name,
    address: raw.address ?? "Adresse inconnue",
    position: {
      lat: raw.position?.lat ?? 0,
      lng: raw.position?.lng ?? 0,
    },
    banking: raw.banking ?? false,
    bonus: raw.bonus ?? false,
    status: raw.status === "OPEN" ? "OPEN" : "CLOSED",
    lastUpdate: new Date(raw.lastUpdate ?? Date.now()).getTime(),
    totalStands: {
      capacity: raw.totalStands?.capacity ?? 0,
      availabilities: {
        bikes: raw.totalStands?.availabilities?.bikes ?? 0,
        stands: raw.totalStands?.availabilities?.stands ?? 0,
        mechanicalBikes: raw.totalStands?.availabilities?.mechanicalBikes ?? 0,
        electricalBikes: raw.totalStands?.availabilities?.electricalBikes ?? 0,
        electricalInternalBatteryBikes:
          raw.totalStands?.availabilities?.electricalInternalBatteryBikes ?? 0,
        electricalRemovableBatteryBikes:
          raw.totalStands?.availabilities?.electricalRemovableBatteryBikes ?? 0,
      },
    },
  };
}