import Layout from "../components/Layout"
import Image from "next/image"

export default function Contact() {
  return (
    <Layout title="Contact - Club de Basket Combourg">
      <h1 className="text-4xl font-bold mb-6">Contact</h1>
      <div className="contact-info bg-custom-gray rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-4">Informations et contact</h2>
        <p>
          <strong>Email :</strong> lachateaubriandcombourgbasket@gmail.com
        </p>
        <p>
          <strong>Téléphone :</strong> 07 66 25 63 47
        </p>
        <p>
          <strong>Adresse :</strong> Avenue Waldmunchen, 35270 Combourg
        </p>

        {/* Carte Google Maps */}
        <h2 className="text-2xl font-semibold mt-8 mb-4">Localisation</h2>
        <div className="mb-8 rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2654.7!2d-1.7486!3d48.4114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x480e9b5b5b5b5b5b%3A0x5b5b5b5b5b5b5b5b!2sAvenue%20Waldmunchen%2C%2035270%20Combourg!5e0!3m2!1sfr!2sfr!4v1234567890"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localisation de la salle"
          />
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Notre salle</h2>
        <p className="mb-4">
          Notre salle moderne est équipée pour accueillir tous les niveaux de joueurs, des débutants aux confirmés.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Image
            src="/images/interieur_salle.jpeg"
            alt="Intérieur de la salle"
            width={400}
            height={300}
            style={{ height: "auto" }}
            layout="responsive"
            className="rounded-lg"
          />
          <Image
            src="/images/exterieur_salle.jpeg"
            alt="Extérieur de la salle"
            width={400}
            height={300}
            style={{ height: "auto" }}
            layout="responsive"
            className="rounded-lg"
          />
        </div>
      </div>
    </Layout>
  )
}

