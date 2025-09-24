import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 px-4">
      <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-6 text-center">
        🚲 JCDecaux Map
      </h1>

      <Link
        to="/stations"
        className="w-full sm:w-auto text-center px-6 py-3 rounded-lg bg-blue-500 text-white shadow hover:bg-blue-600 transition"
      >
        Explorer les stations
      </Link>
    </div>
  );
}
