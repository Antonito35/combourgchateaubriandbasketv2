import { useState } from "react"
import Layout from "../components/Layout"
import Image from "next/image"
import { X } from "lucide-react"

export default function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <Layout title="Planning des entrainements - Club de Basket Combourg">
      <h1 className="text-4xl font-bold mb-6">Le planning des entrainements</h1>
      <div className="contact-info bg-custom-gray rounded-lg p-8">
        <div 
          className="cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => setIsModalOpen(true)}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => e.key === 'Enter' && setIsModalOpen(true)}
        >
          <Image
            src="/images/planning 25-26.png"
            alt="Planning des entrainements - Cliquez pour agrandir"
            width={400}
            height={300}
            style={{ height: "auto" }}
            layout="responsive"
            className="rounded-lg"
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
              src="/images/planning 25-26.png"
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

