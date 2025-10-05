import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-center px-4">
      {/* 🧭 Titre principal */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-red-600 mb-4">
        404
      </h1>

      <p className="text-lg md:text-xl text-gray-700 mb-6">
        Oups ! La page que vous cherchez est introuvable.
      </p>

      {/* 🔗 Lien de retour */}
      <Link
        to="/"
        className="px-6 py-3 rounded-lg bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 transition"
      >
        Retour à l’accueil
      </Link>
    </main>
  );
}
