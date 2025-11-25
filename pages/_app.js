import { useEffect, useState } from "react";
import { Kurale } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Loader from "../components/Loader";
import "../styles/globals.css";

// Importer la police Kurale
const kurale = Kurale({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-kurale", // Définit une variable CSS pour Tailwind
});

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulation d'un chargement
  }, []);

  return (
    <div className={kurale.variable}>
      {loading ? <Loader /> : <Component {...pageProps} />}
      <Analytics />
    </div>
  );
}

export default MyApp;
