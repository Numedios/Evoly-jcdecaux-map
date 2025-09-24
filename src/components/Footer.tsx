export default function Footer() {
  return (
    <footer className="bg-white border-t py-4 px-4 text-center text-sm text-gray-600">
      <p className="leading-snug">
        🚲 JCDecaux Map — Mini-projet React
      </p>

      <p className="mt-1">
        <a
          href="https://developer.jcdecaux.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Données JCDecaux
        </a>
      </p>

      <p className="mt-1 text-gray-400 text-xs sm:text-sm">
        Réalisé avec React, TypeScript, Tailwind et Leaflet
      </p>
    </footer>
  );
}
