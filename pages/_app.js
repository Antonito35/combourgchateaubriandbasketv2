import { useEffect, useState } from "react";
import { Kurale } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Link from "next/link";
import Loader from "../components/Loader";
import "../styles/globals.css";

// Importer la police Kurale
const kurale = Kurale({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-kurale",
});

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      if (!sessionStorage.getItem("popupForumAssociationSeen")) {
        setTimeout(() => setShowPopup(true), 400);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    sessionStorage.setItem("popupForumAssociationSeen", "true");
    setShowPopup(false);
  };

  return (
    <div className={kurale.variable}>
      {loading && <Loader />}
      <div style={{ visibility: loading ? "hidden" : "visible" }}>
        <Component {...pageProps} />
      </div>
      <Analytics />

      {showPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          onClick={closePopup}
        >
          <div
            className="bg-gray-900 border border-white/20 rounded-2xl shadow-2xl max-w-md w-full p-8 flex flex-col items-center gap-5 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors text-2xl leading-none"
            >
              ✕
            </button>

            <img
              src="/images/forum association.jpeg"
              alt="Forum de l'association"
              className="w-full rounded-xl object-cover max-h-52"
            />

            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Forum de l&apos;association</h2>
              <p className="text-gray-300 text-base leading-relaxed">
                Rendez-vous le 1er septembre 2026 à 18h30 pour découvrir les projets et les échanges de l&apos;association.
              </p>
            </div>

            <Link
              href="/evenements"
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
