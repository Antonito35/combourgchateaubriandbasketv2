"use client"

import Header2 from "@/components/Header2"
import HomeLayout from "@/components/HomeLayout"
import ScrollingMenu from "@/components/ScrollingMenu"
import ImageSlider from "@/components/ImageSlider"
import ImageCarousel from "@/components/ImageCarousel"
import Image from "next/image"

import Head from "next/head"

export default function Home() {
  const scrollToAbout = () => {
    // Récupérer l'élément
    const aboutSection = document.getElementById("about-section")

    if (aboutSection) {
      // Calculer la position avec un offset de 100px (ajustez selon vos besoins)
      const offsetPosition = aboutSection.getBoundingClientRect().top + window.pageYOffset - 100 // Offset de 100px vers le haut

      // Faire défiler jusqu'à cette position
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <>
      <Head>
        <title>Combourg Chateaubriand Basket - Club de Basketball depuis 1928</title>
        <meta name="description" content="La Chateaubriand Combourg Basket, club de basketball à Combourg (35) depuis 1928. Découvrez nos équipes, planning des entrainements, inscriptions et boutique officielle." />
      
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Section Hero avec image de fond qui prend toute la page */}
      <section id="hero-section" className="relative w-full h-screen">
        {/* Image de fond */}
        <div className="absolute inset-0">
          <Image
            src="/images/equipe_rond.jpg"
            alt="Image de fond"
            fill
            priority
            className="object-cover w-full h-full"
          />
          {/* Filtre sombre */}
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <Header2 />
        {/* Contenu superposé */}
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="mb-6 text-4xl font-bold md:text-6xl">Bienvenue au Club de Basket de Combourg</h1>
          <p className="max-w-2xl text-lg md:text-xl">La Chateaubriand Combourg Basket vous accueille depuis 1928</p>
          <button
            onClick={scrollToAbout}
            className="mt-8 rounded-md bg-white px-6 py-3 font-medium text-black transition-colors hover:bg-gray-200"
          >
            En savoir plus
          </button>
        </div>
      </section>

      <HomeLayout>
        {/* Élément d'ancrage invisible pour le défilement */}
        <div id="scroll-anchor" className="h-0 overflow-hidden"></div>

        {/* Section À propos */}
        <section id="about-section" className="pt-24 pb-16 px-4 bg-gray-100">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">Qui sommes nous ?</h2>
                <p className="text-gray-700 mb-4">
                  La Chateaubriand Combourg Basket est une section de l'association la Chateaubriand, loi 1901,
                  proposant l'enseignement et la pratique du basket-ball sur la commune de Combourg depuis 1928. Elle
                  dispose de 22 équipes des babys (U7) aux vétérans. L'équipe phare du club évolue en régional masculin.
                </p>
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">Les valeurs du club :</h2>
                <ul className="list-none space-y-2 flex flex-col items-center text-gray-700">
                  <li className="flex items-center justify-center">
                    <span className="mr-2">🏀</span>
                    <span>Convivialité</span>
                  </li>
                  <li className="flex items-center justify-center">
                    <span className="mr-2">🤝</span>
                    <span>Entraide</span>
                  </li>
                  <li className="flex items-center justify-center">
                    <span className="mr-2">🎖️</span>
                    <span>Respect</span>
                  </li>
                </ul>
              </div>

              <div>
                <ImageSlider />
              </div>
            </div>
          </div>
        </section>

        {/* Section Galerie */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Planning Des Matchs du Week-End</h2>
            <ImageCarousel />
          </div>
        </section>
        {/* Section Menu défilant */}
        <section className="py-8 px-4 bg-gray-100">
          <div className="container mx-auto">
            <ScrollingMenu />
          </div>
        </section>
      </HomeLayout>
    </>
  )
}

