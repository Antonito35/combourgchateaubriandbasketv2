"use client"

import Head from "next/head"
import Header2 from "./Header2"
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
        <meta name="description" content="Site officiel du Club de Basket de Combourg" />
        <link rel="icon" type="image/png" href="/images/logo.png?v=1" />
        <link rel="shortcut icon" href="/images/logo.png?v=1" />
        <link rel="apple-touch-icon" href="/images/logo.png?v=1" />
      </Head>
      <div className="flex flex-col min-h-screen bg-custom-blue text-white">
        
        <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
        <Footer />
      </div>
    </>
  )
}
