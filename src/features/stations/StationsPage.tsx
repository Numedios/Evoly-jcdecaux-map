import { useState } from "react";
import Papa from "papaparse";
import Map from "./Map";
import type { Station } from "../../types/station";

export default function StationsPage() {
    const [stations, setStations] = useState<Station[]>([]);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (result) => {
                const parsedStations: Station[] = result.data
                    .map((row: any) => {
                        let lat = parseFloat(row.Latitude);
                        let lng = parseFloat(row.Longitude);

                        // 🚨 Cas où Latitude contient du texte (CSV mal formé avec virgule dans l'adresse)
                        if (isNaN(lat) && row.__parsed_extra && row.__parsed_extra.length > 0) {
                            lat = parseFloat(row.Longitude);          // on décale Longitude en Latitude
                            lng = parseFloat(row.__parsed_extra[0]);  // et on prend la vraie Longitude
                        }

                        if (isNaN(lat) || isNaN(lng)) {
                            console.warn(`Station ${row.Number} - ${row.Name} ignorée (coordonnées invalides)`);
                            return null;
                        }

                        return {
                            number: parseInt(row.Number),
                            name: row.Name,
                            // 📝 On reconstruit l’adresse : Address + si Latitude est du texte → on concatène
                            address:
                                row.Address && isNaN(parseFloat(row.Latitude))
                                    ? `${row.Address}, ${row.Latitude}`
                                    : row.Address || "Adresse inconnue",
                            lat,
                            lng,
                        };
                    })
                    .filter((s): s is Station => s !== null);

                setStations(parsedStations);
            },
        });
    };

    return (
        <div className="flex flex-col h-screen">
            {/* Header */}
            <header className="bg-white shadow-md p-4 flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center rounded-b-lg">
                <h1 className="text-2xl font-extrabold text-blue-600 tracking-tight">
                    🚲 JCDecaux Map
                </h1>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                    {/* Recherche */}
                    <input
                        type="text"
                        placeholder="🔍 Rechercher une station..."
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full sm:w-64 transition"
                    />

                    {/* Upload CSV stylisé */}
                    <label className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 transition text-center text-sm font-medium">
                        Importer CSV
                        <input
                            type="file"
                            accept=".csv"
                            onChange={handleFileUpload}
                            className="hidden"
                        />
                    </label>
                </div>
            </header>

            {/* Carte */}
            <main className="flex-1">
                <Map stations={stations} />
            </main>
        </div>
    );
}
