"use client"

import Layout from "../components/Layout"
import ImageZoom from "@/components/ImageZoom"

const eventsData = [
  {
    id: 1,
    title: "Forum de l'association",
    date: "2026-09-05",
    dateDisplay: "5 septembre 2026",
    time: "9h - 16h",
    location: "Espace Malouas, Rue de Malouas, 35270 Combourg",
    description: "Rencontre de l'association pour présenter le club, les projets à venir et échanger avec les adhérents et bénévoles.",
    image: "/images/forum association.jpeg",
  },
]

const sortedEvents = [...eventsData].sort((a, b) => new Date(b.date) - new Date(a.date))

export default function Evenements() {
  return (
    <Layout title="Événements - Combourg Châteaubriand Basket" description="Tous les événements du club de basketball Combourg Châteaubriand : tournois, repas annuel, soirées et animations. Inscrivez-vous en ligne.">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12" data-aos="fade-down">
          <h1 className="text-4xl font-bold mb-4">Événements du Club</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Retrouvez les événements du club et les rendez-vous de l&apos;association.
          </p>
        </div>

        <div className="flex flex-col items-center gap-8 mb-12">
          {sortedEvents.map((event, index) => (
            <div
              key={event.id}
              className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl max-w-2xl w-full"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="relative h-80 md:h-96 w-full border-4 border-white rounded-lg overflow-hidden">
                <ImageZoom
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                  thumbnail={true}
                />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-white">{event.title}</h3>

                <div className="space-y-3 text-gray-300 text-base">
                  <div className="flex items-center">
                    <span className="mr-2">📅</span>
                    <span>{event.dateDisplay}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">🕒</span>
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">📍</span>
                    <span>{event.location}</span>
                  </div>
                  <p className="pt-2 text-gray-200 leading-relaxed">{event.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-custom-gray rounded-xl p-10 md:p-12 text-center mb-12 shadow-2xl border border-gray-600" data-aos="fade-up">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-5 text-white">Vous souhaitez venir aider ou avez des questions ?</h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Contactez-nous pour plus d&apos;informations sur nos événements
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
