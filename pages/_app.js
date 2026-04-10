import { useEffect, useState } from "react";
import { Kurale } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Loader from "../components/Loader";
import "../styles/globals.css";
import Link from "next/link";

// Importer la police Kurale
const kurale = Kurale({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-kurale", // Définit une variable CSS pour Tailwind
});

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      // Afficher le popup une seule fois par session
      if (!sessionStorage.getItem("popupSeen")) {
        setTimeout(() => setShowPopup(true), 400);
      }
    }, 2000);
  }, []);

  const closePopup = () => {
    sessionStorage.setItem("popupSeen", "true");
    setShowPopup(false);
  };

  return (
    <div className={kurale.variable}>
      {loading && <Loader />}
      <div style={{ visibility: loading ? "hidden" : "visible" }}>
        <Component {...pageProps} />
      </div>
      <Analytics />

      {/* Popup événement */}
      {showPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          onClick={closePopup}
        >
          <div
            className="bg-gray-900 border border-white/20 rounded-2xl shadow-2xl max-w-md w-full p-8 flex flex-col items-center gap-5 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Bouton fermer */}
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors text-2xl leading-none"
            >
              ✕
            </button>

            {/* Image */}
            <img
              src="/images/repas basket.jpg"
              alt="Repas du Basket"
              className="w-full rounded-xl object-cover max-h-52"
            />

            {/* Texte */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">🍽️ Repas du Basket</h2>
              <p className="text-gray-300 text-base leading-relaxed">
                Le club organise son repas annuel ! Venez passer une soirée conviviale avec les membres du club.
                Inscrivez-vous dès maintenant en ligne.
              </p>
            </div>

            {/* Bouton */}
            <Link
              href="/evenements#repas-basket"
              onClick={closePopup}
              className="inline-block bg-white text-blue-900 px-8 py-3 rounded-xl font-bold text-lg hover:bg-gray-200 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
            >
              Voir l&apos;événement
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyApp;
