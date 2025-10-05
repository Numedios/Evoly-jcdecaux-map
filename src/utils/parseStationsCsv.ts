import type { CsvStation, StationCsvRow } from "../types/station";

// src/types/csv.ts


export function parseStationsCsv(data: StationCsvRow[], contract: string): CsvStation[] {
  return data
    .map((row, index) => {
      if (!row.Number || !row.Name || !row.Latitude || !row.Longitude) {
        console.warn(`❌ Ligne ${index + 1} ignorée : colonnes manquantes`);
        return null;
      }

      let lat = parseFloat(row.Latitude);
      let lng = parseFloat(row.Longitude);

      if (isNaN(lat) && row.__parsed_extra && row.__parsed_extra.length > 0) {
        lat = parseFloat(row.Longitude);
        lng = parseFloat(row.__parsed_extra[0]);
      }

      if (isNaN(lat) || isNaN(lng)) {
        console.warn(`❌ Ligne ${index + 1} ignorée : coordonnées invalides`);
        return null;
      }

      const cleanedName =
        row.Name.includes(" - ") ? row.Name.split(" - ")[1] : row.Name;

      return {
        number: parseInt(row.Number, 10),
        name: cleanedName || `Station ${row.Number}`,
        address: row.Address || "Adresse inconnue",
        lat,
        lng,
        contract,
      } as CsvStation;
    })
    .filter((s): s is CsvStation => s !== null);
}