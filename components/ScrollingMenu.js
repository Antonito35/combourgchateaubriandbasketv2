"use client"

const images = [
  "/images/hyper_u.png",
  "/images/intermarche.png",
  "/images/le_repaire.jpg",
  "/images/macdo.png",
  "/images/maxivelo.png",
  "/images/orange_bleu.png",
  "/images/chat_toque.jpeg",
  "/images/cour du temple.png",
]

// Tableau d'URLs correspondant à chaque image
const links = [
  "https://www.magasins-u.com/hyperu",
  "https://www.intermarche.com",
  "https://www.lerepaire35.fr/",
  "https://www.mcdonalds.fr",
  "https://www.maxivelo.fr/",
  "https://www.lorangebleue.fr",
  ,
]

const ScrollingMenu = () => {
  return (
    <div className="scrollWrapper">
      <div className="scrollMenu">
        {images.map((src, index) => (
          <div className="menuItem grayscale transition duration-300 hover:grayscale-0 cursor-pointer" key={index}>
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
          <div className="menuItem grayscale transition duration-300 hover:grayscale-0 cursor-pointer" key={index + images.length}>
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

