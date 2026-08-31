import Layout from "../components/Layout"

export default function ForumAssociation() {
  return (
    <Layout
      title="Forum de l'association - Combourg Châteaubriand Basket"
      description="Forum de l'association du club de basketball Combourg Châteaubriand Basket. Retrouvez les informations utiles, les échanges et les annonces de l'association."
    >
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8" data-aos="fade-down">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Forum de l&apos;association</h1>
          <p className="text-base md:text-lg text-gray-300 max-w-xl mx-auto leading-relaxed">
            Un espace dédié aux échanges, annonces et informations de l&apos;association.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 md:p-6 border border-white/10 min-h-[220px]" data-aos="fade-up">
            <h2 className="text-xl md:text-2xl font-bold mb-3 text-white">À venir</h2>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              Le forum association est en cours de préparation. Les infos et discussions utiles seront mises à disposition prochainement.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 md:p-6 border border-white/10 min-h-[220px]" data-aos="fade-up" data-aos-delay="100">
            <h2 className="text-xl md:text-2xl font-bold mb-3 text-white">Informations</h2>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              Pour toute demande, question ou renseignement, contactez directement l&apos;association via la page contact.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center" data-aos="fade-up" data-aos-delay="200">
          <a
            href="/contact"
            className="inline-block bg-white text-blue-900 px-7 py-3 rounded-xl font-bold text-base md:text-lg hover:bg-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Nous contacter
          </a>
        </div>
      </div>
    </Layout>
  )
}
