// src/components/NotFound.tsx
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50">
      <h1 className="text-3xl font-bold text-red-600 mb-4">
        404 - Page non trouvée
      </h1>
      <Link
        to="/"
        className="px-6 py-3 rounded-lg bg-blue-500 text-white shadow hover:bg-blue-600 transition"
      >
        Retour à l’accueil
      </Link>
    </div>
  );
}
