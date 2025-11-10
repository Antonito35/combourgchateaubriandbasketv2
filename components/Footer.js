import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-custom-gray py-4">
      <div className="container mx-auto px-4 flex justify-center items-center space-x-4">
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
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Club de Basket. Tous droits réservés. Site développé par Antoine SIMON, Antoine LEMESLE et Ridwan
        </p>
      </div>
    </footer>
  )
}
