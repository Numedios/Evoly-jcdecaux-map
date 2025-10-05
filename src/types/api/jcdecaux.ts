// types/jcdecaux.ts

export interface JCDecauxStationRealtime {
  number: number;
  contractName: string;
  name: string;
  address: string;
  position: {
    lat: number;
    lng: number;
  };
  banking: boolean;
  bonus: boolean;
  status: "OPEN" | "CLOSED";
  lastUpdate: number; // timestamp (ms)
  totalStands: {
    capacity: number;
    availabilities: {
      bikes: number;
      stands: number;
      mechanicalBikes: number;
      electricalBikes: number;
      electricalInternalBatteryBikes: number;
      electricalRemovableBatteryBikes: number;
    };
  };
}
