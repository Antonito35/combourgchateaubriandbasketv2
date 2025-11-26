"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import ImageZoom from "@/components/ImageZoom";

export default function ProductCard({ product, addToCart }) {
  // default color left empty so user still must select for add-to-cart validation
  const [color, setColor] = useState("")
  const [size, setSize] = useState("")
  const [flocking, setFlocking] = useState("")
  const [imgIndex, setImgIndex] = useState(0)

  // Determine which images to show depending on selected color (if product provides imagesByColor)
  const selectedColorForImage = color || (product.colors && product.colors.length ? product.colors[0] : null)

  let images = product.images || (product.image ? [product.image] : [])
  if (!images || images.length === 0) {
    images = ["/images/image.png"]
  }
  if (product.imagesByColor) {
    if (selectedColorForImage && product.imagesByColor[selectedColorForImage]) {
      images = product.imagesByColor[selectedColorForImage]
    } else {
      // fallback to first available color mapping
      const firstKey = Object.keys(product.imagesByColor)[0]
      if (firstKey) images = product.imagesByColor[firstKey]
    }
  }

  // Reset displayed index when the images set changes (e.g., color selection)
  useEffect(() => {
    setImgIndex(0)
  }, [images])

  const handleAddToCart = () => {
    if (!color || !size) {
      alert("Veuillez sélectionner une couleur et une taille.")
      return
    }
    if (!flocking || flocking.trim().length !== 2) {
      alert("Le flocage (initiales) est obligatoire et doit contenir exactement 2 lettres.")
      return
    }
    addToCart(product, color, size, flocking)
  }

  const prevImage = (e) => {
    if (e && e.stopPropagation) e.stopPropagation()
    setImgIndex((i) => (i === 0 ? images.length - 1 : i - 1))
  }

  const nextImage = (e) => {
    if (e && e.stopPropagation) e.stopPropagation()
    setImgIndex((i) => (i === images.length - 1 ? 0 : i + 1))
  }

  return (
    <div className="product-card p-6">
      <div className="text-left">  
        <div className="mb-3 rounded-md overflow-hidden bg-white/5 p-3 flex items-center justify-center relative h-48 md:h-64 lg:h-80">
          <ImageZoom src={images[imgIndex]} onPrev={prevImage} onNext={nextImage} thumbnail className="w-full h-full" />

          {images.length > 1 && (
            /* Only show the right arrow on the card as requested; modal still supports prev/next */
            <>
              <button
                onClick={(e) => { e.stopPropagation(); nextImage() }}
                aria-label="Suivant"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white text-gray-900 p-3 rounded-full z-30 shadow-xl hover:scale-105 transition-transform"
                title="Voir la photo suivante"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        <h3 className="text-lg font-semibold mt-2 text-white">{product.name}</h3>
        <p className="text-sm text-gray-200">Prix : {product.price}€</p>
      </div>
      <select
        className="mt-3 w-full p-3 bg-transparent text-white border border-gray-500 rounded text-base"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      >
        <option value="">Choisir une couleur</option>
        {(product.colors || ["Blanc", "Noir"]).map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      {/* visual swatch for selected color */}
      {color && (
        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm">Couleur sélectionnée :</span>
          <span
            className="w-6 h-6 rounded-full inline-block"
            style={{
              backgroundColor: color.toLowerCase() === 'blanc' ? '#ffffff' : color.toLowerCase() === 'noir' ? '#000000' : color,
              border: color.toLowerCase() === 'blanc' ? '1px solid #ccc' : '1px solid rgba(0,0,0,0.2)'
            }}
            aria-hidden
          />
          <span className="text-sm">{color}</span>
        </div>
      )}
      <select
        className="mt-3 w-full p-3 bg-transparent text-white border border-gray-500 rounded text-base"
        value={size}
        onChange={(e) => setSize(e.target.value)}
      >
        <option value="">Choisir une taille</option>
        {(product.sizes || ["6-8 ans", "8-10 ans", "10-12 ans", "S", "M", "L", "XL"]).map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <div className="mt-2">
        <label className="block">Flocage (initiales, 2 lettres) — obligatoire :</label>
        <input
          type="text"
          maxLength={2}
          value={flocking}
          onChange={(e) => setFlocking(e.target.value.toUpperCase().replace(/[^A-Z]/g, ""))}
          className="w-full border rounded px-3 py-2 bg-transparent text-white border-gray-500 text-lg"
          placeholder="Ex: AB"
        />
        <p className="text-sm mt-1">Flocage inclus — initiales obligatoires</p>
      </div>
      <button
        onClick={handleAddToCart}
        className="mt-4 btn-add px-5 py-3 rounded w-full text-lg"
      >
        Ajouter au panier
      </button>
    </div>
  )
}

