"use client";
import { useState, useEffect } from "react";
import Image from "next/image"; // Importation du composant optimisé de Next.js

const images = [
  "/images/U18M3.jpeg",
  "/images/coach25-26.jpg",
  "/images/SM2.JPG",
  "/images/SM1Grande.jpg",
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change toutes les 5 secondes

    return () => clearInterval(interval); // Nettoyage à la fin
  }, []);

  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      {images.map((src, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
        
          <Image
            src={src}
            alt={`Slide ${index + 1}`} // Texte alternatif pour l'accessibilité
            layout="fill" // Utilisation de la méthode layout pour ajuster les images
            objectFit="cover" // S'assurer que l'image couvre tout l'espace sans être déformée
            priority={index === currentIndex} // Charger l'image active en priorité
          />
          
        </div>
      ))}
    </div>
  );
};

export default ImageSlider;
