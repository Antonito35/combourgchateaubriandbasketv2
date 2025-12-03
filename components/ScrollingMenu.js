"use client"

const images = [
  "/images/hyper_u.png",
  "/images/intermarche.png",
  "/images/macdo.png",
  "/images/acotex.png",
  "/images/cour du temple.png",
  "/images/Atelier d'Architectes GBK.png",
  "/images/axa.png",
  "/images/CAFÉ DE LA POSTE.jpg",
  "/images/CAPEOS CONSEILS.png",
  "/images/Chateaubriand Immo.png",
  "/images/Coiffure Moranzoni Christian.jpg",
  "/images/CRÉDIT MUTUEL.png",
  "/images/CCE.png",
  "/images/DENIS MATERIAUX.png",
  "/images/Renault.png",
  "/images/gitem.png",
  "/images/groupama.png",
  "/images/L'opticien.png",
  "/images/Menuiserie Grinhard Frères.png",
  "/images/PIZZA IN.png",
  "/images/Rahuel Bois.png",
]

// Tableau d'URLs correspondant à chaque image
const links = [
  "https://www.magasins-u.com/hyperu",
  "https://www.intermarche.com",
  "https://www.mcdonalds.fr",
  "https://www.acotex-quincaillerie.fr/",
  "https://www.facebook.com/lacourdutemplecombourg/?locale=fr_FR",
  "https://www.aagbk.fr/",
  "https://agence.axa.fr/distributeur/0002422804",
  "https://www.facebook.com/p/Caf%C3%A9-de-la-Poste-Combourg-61578333068973/",
  "https://www.capeos.fr/expertise-comptable-combourg",
  "https://www.cabinetchateaubriand.com/agence-chateaubriand/cabinet-chateaubriand-immobilier-combourg/",
  "https://www.pagesjaunes.fr/pros/03144227",
  "https://www.cmb.fr/reseau-bancaire-cooperatif/web/recherche-agence-credit-mutuel-de-bretagne/ille-et-vilaine/combourg/combourg-35270",
  "https://www.cce35.fr/couvreur-dol-de-bretagne-combourg/",
  "https://www.denismateriaux.com/nos-agences/agence-combourg",
  "https://www.pagesjaunes.fr/pros/01695889",
  "https://www.pagesjaunes.fr/pros/05846832",
  "https://agences.groupama.fr/assurance/loire-bretagne/agence-groupama-combourg-idLBR37085",
  "https://lopticiencombourg.com/",
  "https://www.grinhard-freres.fr/",
  "https://www.combourg-pizza.com/",
  "https://rahuelbois.com/",


]

const ScrollingMenu = () => {
  return (
    <div className="scrollWrapper">
      <div className="scrollMenu">
        {images.map((src, index) => (
          <div className="menuItem transition duration-300 cursor-pointer" key={index}>
            <a href={links[index]} target="_blank" rel="noopener noreferrer">
              <img
                src={src || "/placeholder.svg"}
                alt={`Image ${index + 1}`}
                className="image"
                style={{ cursor: "pointer" }}
              />
            </a>
          </div>
        ))}
        {/* Duplique les images pour un effet de boucle infinie */}
        {images.map((src, index) => (
          <div className="menuItem transition duration-300 cursor-pointer" key={index + images.length}>
            <a href={links[index]} target="_blank" rel="noopener noreferrer">
              <img
                src={src || "/placeholder.svg"}
                alt={`Image ${index + 1}`}
                className="image"
                style={{ cursor: "pointer" }}
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ScrollingMenu

