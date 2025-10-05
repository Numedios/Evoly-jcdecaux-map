// src/types/data/station.ts
export interface CsvStation {
  number: number;
  name: string;
  address: string;
  lat: number;
  lng: number;
  contract: string;
}

export interface StationCsvRow {
  Number: string;
  Name: string;
  Address?: string;
  Latitude: string;
  Longitude: string;
  __parsed_extra?: string[];
}

export interface RealtimeSummary {
  number: number;
  name: string;
  contractName: string;
  address: string;
  status: "OPEN" | "CLOSED";
  totalStands: {
    availabilities: {
      bikes: number;
      stands: number;
    };
  };
}