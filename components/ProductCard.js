"use client"

import { useState } from "react"
import Image from "next/image"
import ImageZoom from "@/components/ImageZoom";

export default function ProductCard({ product, addToCart }) {
  const [color, setColor] = useState("")
  const [size, setSize] = useState("")
  const [flocking, setFlocking] = useState("")

  const handleAddToCart = () => {
    if (!color || !size) {
      alert("Veuillez sélectionner une couleur et une taille.")
      return
    }
    if (!flocking || flocking.trim().length !== 2) {
      alert("Le floquage (initiales) est obligatoire et doit contenir exactement 2 lettres.")
      return
    }
    addToCart(product, color, size, flocking)
  }

  return (
    <div className="product-card p-6">
      <div className="text-left">  
        <div className="mb-3 rounded-md overflow-hidden bg-white/5 p-3 flex items-center justify-center">
          <ImageZoom src={product.image} />
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
        <label className="block">Floquage (initiales, 2 lettres) — obligatoire :</label>
        <input
          type="text"
          maxLength={2}
          value={flocking}
          onChange={(e) => setFlocking(e.target.value.toUpperCase().replace(/[^A-Z]/g, ""))}
          className="w-full border rounded px-3 py-2 bg-transparent text-white border-gray-500 text-lg"
          placeholder="Ex: AB"
        />
        <p className="text-sm mt-1">Floquage inclus — initiales obligatoires</p>
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

