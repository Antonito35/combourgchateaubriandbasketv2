"use client"

import Layout from "../components/Layout"
import Image from "next/image"
import ImageZoom from "@/components/ImageZoom"

// Données des événements (à personnaliser selon vos besoins)
const eventsData = [
  {
    id: 1,
    title: "Tournoi des Familles",
    date: "2026-02-15",
    dateDisplay: "13 février 2026",
    image: "/images/tournoi_des_familles.png",
  }
]

// Trier les événements par ordre chronologique (du plus proche au plus lointain)
const sortedEvents = [...eventsData].sort((a, b) => new Date(a.date) - new Date(b.date))

export default function Evenements() {
  return (
    <Layout title="Événements - Club de Basket Combourg">
      <div className="max-w-7xl mx-auto px-4">
        {/* En-tête */}
        <div className="text-center mb-12" data-aos="fade-down">
          <h1 className="text-4xl font-bold mb-4">Événements du Club</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Découvrez les événements organisés par le club
          </p>
        </div>

        {/* Liste des événements */}
        <div className="flex justify-center mb-12">
          {sortedEvents.map((event, index) => (
            <div
              key={event.id}
              className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl max-w-2xl w-full"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Image */}
              <div className="relative h-80 md:h-96 w-full border-4 border-white rounded-lg overflow-hidden">
                <ImageZoom
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                  thumbnail={true}
                />
              </div>

              {/* Contenu */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-white">{event.title}</h3>
                
                <div className="flex items-center text-gray-300">
                  <span className="mr-2">📅</span>
                  <span className="text-lg">{event.dateDisplay}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message si aucun événement */}
        {sortedEvents.length === 0 && (
          <div className="text-center py-12" data-aos="fade-up">
            <p className="text-xl text-gray-300">Aucun événement prévu pour le moment</p>
          </div>
        )}

        {/* Section Contact */}
        <div className="bg-custom-gray rounded-xl p-10 md:p-12 text-center mb-12 shadow-2xl border border-gray-600" data-aos="fade-up">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-5 text-white">Vous souhaitez venir aider ou avez des questions ?</h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Contactez-nous pour plus d'informations sur nos événements
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-white text-blue-900 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Nous contacter
            </a>
          </div>
        </div>
      </div>
    </Layout>
  )
}
