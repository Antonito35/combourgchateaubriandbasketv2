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
        <title>Combourg Chateaubriand Basket - Club de Basketball à Combourg</title>
        <meta name="description" content="Combourg Chateaubriand Basket : club de basketball à Combourg depuis 1928. Découvrez nos équipes, nos entraînements, nos résultats et notre boutique en ligne." />
        <meta name="keywords" content="Combourg Chateaubriand Basket, club basket Combourg, basketball Combourg, La Chateaubriand, basket Combourg 35, entraînement basketball, club sportif Combourg, équipes basket" />
        <meta name="google-site-verification" content="EWfsYEmYA9xPnfG1TX86g-n-0QP2zbGzfdw6dMRgwDQ" />
        <meta name="author" content="La Chateaubriand Combourg Basket" />
        <meta name="geo.region" content="FR-35" />
        <meta name="geo.placename" content="Combourg" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="French" />
        <meta name="revisit-after" content="7 days" />
        <link rel="canonical" href="https://combourgchateaubriandbasket.fr" />
        <link rel="icon" type="image/png" href="/images/logo.png" />
        
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

