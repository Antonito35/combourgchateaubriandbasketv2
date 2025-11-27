import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-custom-gray py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-2">
          <div className="flex items-center space-x-4">
            <a href="https://www.instagram.com/lachateaubriandcombourgbasket/" target="_blank" rel="noopener noreferrer">
              <Image src="/images/img_insta.webp" alt="Instagram" width={16} height={16} style={{ height: "auto" }} />
            </a>
            <a
              href="https://www.facebook.com/p/La-Chateaubriand-Combourg-Basket-Club-100064278326112/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src="/images/logo_facebook.png" alt="Facebook" width={16} height={16} style={{ height: "auto" }} />
            </a>
          </div>
          <p className="text-sm text-center">
            &copy; {new Date().getFullYear()} Club de Basket. Tous droits réservés. Site développé par Antoine SIMON, Antoine LEMESLE et Ridwan ABDOULKADER (étudiants en bachelor
informatique)
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-400">
            <a href="/mentions-legales.html" target="_blank" className="hover:text-orange-500">
              Mentions légales
            </a>
            <span>•</span>
            <a href="/cgv.html" target="_blank" className="hover:text-orange-500">
              CGV
            </a>
            <span>•</span>
            <a href="/politique-confidentialite.html" target="_blank" className="hover:text-orange-500">
              Politique de confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
