// services/jcdecaux.ts
import axios from "axios";
import type { JCDecauxStationRealtime } from "../types/api/jcdecaux";

const API_KEY = import.meta.env.VITE_JCDECAUX_API_KEY;
const BASE_URL = "https://api.jcdecaux.com/vls/v3";

export async function fetchStationInfo(
  contract: string,
  stationNumber: number
): Promise<JCDecauxStationRealtime | null> {
  const url = `${BASE_URL}/stations/${stationNumber}?contract=${contract}&apiKey=${API_KEY}`;
  console.log("🔗 Requête JCDecaux:", url);

  try {
    const { data } = await axios.get<JCDecauxStationRealtime>(url);

    // 🧹 Nettoyage du nom → supprimer ce qui est avant " - "
    const cleanedName = data.name.includes(" - ")
      ? data.name.split(" - ")[1]
      : data.name;

    const cleanedData: JCDecauxStationRealtime = {
      ...data,
      name: cleanedName,
    };
    return cleanedData;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        console.error(`❌ Station ${stationNumber} introuvable pour le contrat ${contract}`);
        return null;
      }
      console.error("❌ Erreur Axios:", error.message);
    } else if (error instanceof Error) {
      console.error("❌ Erreur inattendue:", error.message);
    } else {
      console.error("❌ Erreur inconnue:", error);
    }
    throw error; // on relance sauf cas 404
  }
}
