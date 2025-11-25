"use client"

import Head from "next/head"
import Header from "./Header"
import Footer from "./Footer"
import { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"

export default function Layout({ children, title = "Club de Basket Combourg" }) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Club de basket à Combourg - La Chateaubriand Combourg Basket, club de basketball depuis 1928. Inscriptions, équipes, planning des entrainements et boutique." />
        <meta name="keywords" content="combourg chateaubriand basket, lachateaubriand combourg basket, lachateaubriand basket, club basket combourg, basket combourg, chateaubriand basket, basketball combourg, basket 35, club sportif combourg, entrainement basket combourg" />
        <meta name="google-site-verification" content="EWfsYEmYA9xPnfG1TX86g-n-0QP2zbGzfdw6dMRgwDQ" />
        <meta name="author" content="La Chateaubriand Combourg Basket" />
        <meta name="geo.region" content="FR-35" />
        <meta name="geo.placename" content="Combourg" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* JSON-LD pour le référencement local */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SportsOrganization",
              "name": "La Chateaubriand Combourg Basket",
              "alternateName": ["Combourg Chateaubriand Basket", "Chateaubriand Basket", "Club Basket Combourg"],
              "sport": "Basketball",
              "url": "https://combourgchateaubriandbasket.fr",
              "logo": "https://combourgchateaubriandbasket.fr/images/logo.png",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Salle de la Lande du Breil",
                "addressLocality": "Combourg",
                "postalCode": "35270",
                "addressCountry": "FR"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 48.4100,
                "longitude": -1.7500
              },
              "foundingDate": "1928",
              "description": "Club de basketball à Combourg depuis 1928. La Chateaubriand Combourg Basket propose l'enseignement et la pratique du basket pour tous les âges, des U7 aux vétérans."
            })
          }}
        />
      </Head>
      <div className="flex flex-col min-h-screen bg-custom-blue text-white">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
        <Footer />
      </div>
    </>
  )
}

