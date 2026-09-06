import { useEffect, useState } from "react";
import { Kurale } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={kurale.variable}>
      {loading && <Loader />}
      <div style={{ visibility: loading ? "hidden" : "visible" }}>
        <Component {...pageProps} />
      </div>
      <Analytics />
    </div>
  );
}

export default MyApp;
