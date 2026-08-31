import { useState } from "react"
import Layout from "../components/Layout"
import Image from "next/image"
import { X, Download } from "lucide-react"

export default function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleDownloadPlanning = () => {
    const link = document.createElement('a')
    link.href = '/images/planning entrainement 26-27.jpg'
    link.download = 'Planning_Entrainements_2026_2027.jpg'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Layout title="Planning des entraînements - Combourg Châteaubriand Basket" description="Consultez le planning des entraînements et matchs du club de basketball Combourg Châteaubriand. Horaires et créneaux pour toutes les catégories.">
      <h1 className="text-4xl font-bold mb-6">Le planning des entrainements</h1>
      <div className="contact-info bg-custom-gray rounded-lg p-6 md:p-8 max-w-5xl mx-auto">
        <div className="mb-6">
          <button
            onClick={handleDownloadPlanning}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Download className="h-5 w-5" />
            Télécharger le planning
          </button>
        </div>
        <div 
          className="cursor-pointer hover:opacity-90 transition-opacity mx-auto max-w-2xl"
          onClick={() => setIsModalOpen(true)}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => e.key === 'Enter' && setIsModalOpen(true)}
        >
          <Image
            src="/images/planning entrainement 26-27.jpg"
            alt="Planning des entrainements - Cliquez pour agrandir"
            width={1100}
            height={850}
            style={{ height: "auto", maxHeight: "72vh" }}
            className="rounded-lg object-contain mx-auto"
          />
          <p className="text-center text-sm text-gray-300 mt-3 md:hidden">
            📱 Tapez pour agrandir
          </p>
        </div>
      </div>

      {/* Modal plein écran pour mobile */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <button 
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 z-10"
            aria-label="Fermer"
          >
            <X className="h-8 w-8" />
          </button>
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src="/images/planning entrainement 26-27.jpg"
              alt="Planning des entrainements"
              fill
              style={{ objectFit: "contain" }}
              className="rounded-lg"
            />
          </div>
        </div>
      )}
    </Layout>
  )
}

