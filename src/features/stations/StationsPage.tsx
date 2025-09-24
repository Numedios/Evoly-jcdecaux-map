import Map from "./Map";

export default function StationsPage() {
  return (
    <div className="flex flex-col h-screen">
      {/* Header fixe */}
      <header className="bg-white shadow p-4 flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
        {/* Logo / titre */}
        <h1 className="text-xl font-bold text-blue-600">🚲 JCDecaux Map</h1>

        {/* Zone actions */}
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
          <input
            type="text"
            placeholder="Rechercher une station..."
            className="px-3 py-2 border rounded-md text-sm w-full sm:w-auto"
          />
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Importer CSV
          </button>
        </div>
      </header>

      {/* Zone carte */}
      <main className="flex-1">
        <Map />
      </main>
    </div>
  );
}
