import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Contenu de la page */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer global */}
      <Footer />
    </div>
  );
}
