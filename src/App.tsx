
export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-slate-100">
      <h1 className="text-3xl font-bold text-[var(--color-principal)]">
        Titre principal
      </h1>

      <button className="px-6 py-3 rounded-lg bg-[var(--color-principal)] text-white shadow hover:opacity-80 transition">
        Bouton principal
      </button>
    </div>
  );
}
