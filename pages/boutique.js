"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";

const products = [
  { id: 1, name: "T-shirt coton logo coeur", price: 50, images: [
      "/images/img boutique/debardeur logo coeur/devant debardeur logo coueur blanc.png",
      "/images/img boutique/debardeur logo coeur/dos debardeur logo coueur blanc.png",
    ], colors: ["Blanc","Noir"], imagesByColor: {
      Blanc: [
        "/images/img boutique/debardeur logo coeur/devant debardeur logo coueur blanc.png",
        "/images/img boutique/debardeur logo coeur/dos debardeur logo coueur blanc.png",
      ],
      Noir: [
        "/images/img boutique/debardeur logo coeur/devant debardeur logo coueur noir.png",
        "/images/img boutique/debardeur logo coeur/dos debardeur logo coueur noir.png",
      ]
    }, category: "tshirt-coton" },
  { id: 2, name: "T-shirt coton logo dos", price: 50, images: [
      "/images/img boutique/debardeur logo dos/devant debardeur logo dos blanc.png",
      "/images/img boutique/debardeur logo dos/dos debardeur logo dos blanc.png",
    ], colors: ["Blanc","Noir"], imagesByColor: {
      Blanc: [
        "/images/img boutique/debardeur logo dos/devant debardeur logo dos blanc.png",
        "/images/img boutique/debardeur logo dos/dos debardeur logo dos blanc.png",
      ],
      Noir: [
        "/images/img boutique/debardeur logo dos/devant debardeur logo dos noir.png",
        "/images/img boutique/debardeur logo dos/dos debardeur logo dos noir.png",
      ]
    }, category: "tshirt-coton" },
  { id: 3, name: "Jogging", price: 1, images: [
      "/images/img boutique/jogging/jogging noir.png",
    ], category: "jogging" },
  { id: 4, name: "Sweat à capuche logo coeur", price: 80, images: [
      "/images/img boutique/sweat a capuche/devant sweat a capuche logo coeur.png",
      "/images/img boutique/sweat a capuche/dos sweat a capuche logo coeur.png",
    ], category: "sweat-capuche" },
  { id: 5, name: "Sweat à capuche logo dos", price: 80, images: [
      "/images/img boutique/sweat a capuche/devant sweat a capuche logo coeur.png",
      "/images/img boutique/sweat a capuche/dos sweat a capuche logo coeur.png",
    ], category: "sweat-capuche" },
  { id: 6, name: "Sweat zippé logo coeur", price: 80, images: [
      "/images/img boutique/sweat a capuche/devant sweat a capuche logo coeur.png",
      "/images/img boutique/sweat a capuche/dos sweat a capuche logo coeur.png",
    ], category: "sweat-capuche" },
  { id: 7, name: "Sweat zippé logo dos", price: 80, images: [
      "/images/img boutique/sweat a capuche/devant sweat a capuche logo coeur.png",
      "/images/img boutique/sweat a capuche/dos sweat a capuche logo coeur.png",
    ], category: "sweat-capuche" },
  { id: 8, name: "Débardeur coton logo coeur", price: 80, images: [
      "/images/img boutique/debardeur logo coeur/devant debardeur logo coueur noir.png",
      "/images/img boutique/debardeur logo coeur/dos debardeur logo coueur noir.png",
    ], colors: ["Blanc","Noir"], imagesByColor: {
      Blanc: [
        "/images/img boutique/debardeur logo coeur/devant debardeur logo coueur blanc.png",
        "/images/img boutique/debardeur logo coeur/dos debardeur logo coueur blanc.png",
      ],
      Noir: [
        "/images/img boutique/debardeur logo coeur/devant debardeur logo coueur noir.png",
        "/images/img boutique/debardeur logo coeur/dos debardeur logo coueur noir.png",
      ]
    }, category: "debardeur-coton" },
  { id: 9, name: "Débardeur coton logo dos", price: 80, images: [
      "/images/img boutique/debardeur logo dos/devant debardeur logo dos noir.png",
      "/images/img boutique/debardeur logo dos/dos debardeur logo dos noir.png",
    ], colors: ["Blanc","Noir"], imagesByColor: {
      Blanc: [
        "/images/img boutique/debardeur logo dos/devant debardeur logo dos blanc.png",
        "/images/img boutique/debardeur logo dos/dos debardeur logo dos blanc.png",
      ],
      Noir: [
        "/images/img boutique/debardeur logo dos/devant debardeur logo dos noir.png",
        "/images/img boutique/debardeur logo dos/dos debardeur logo dos noir.png",
      ]
    }, category: "debardeur-coton" },
  { id: 10, name: "Débardeur sport logo coeur", price: 80, images: [
      "/images/img boutique/debardeur logo coeur/devant debardeur logo coueur noir.png",
      "/images/img boutique/debardeur logo coeur/dos debardeur logo coueur noir.png",
    ], colors: ["Blanc","Noir"], imagesByColor: {
      Blanc: [
        "/images/img boutique/debardeur logo coeur/devant debardeur logo coueur blanc.png",
        "/images/img boutique/debardeur logo coeur/dos debardeur logo coueur blanc.png",
      ],
      Noir: [
        "/images/img boutique/debardeur logo coeur/devant debardeur logo coueur noir.png",
        "/images/img boutique/debardeur logo coeur/dos debardeur logo coueur noir.png",
      ]
    }, category: "debardeur-sport" },
  { id: 11, name: "Débardeur sport logo dos", price: 80, images: [
      "/images/img boutique/debardeur logo dos/devant debardeur logo dos noir.png",
      "/images/img boutique/debardeur logo dos/dos debardeur logo dos noir.png",
    ], colors: ["Blanc","Noir"], imagesByColor: {
      Blanc: [
        "/images/img boutique/debardeur logo dos/devant debardeur logo dos blanc.png",
        "/images/img boutique/debardeur logo dos/dos debardeur logo dos blanc.png",
      ],
      Noir: [
        "/images/img boutique/debardeur logo dos/devant debardeur logo dos noir.png",
        "/images/img boutique/debardeur logo dos/dos debardeur logo dos noir.png",
      ]
    }, category: "debardeur-sport" },
];

export default function Boutique() {
  // Dédupliquer par id (prévention en cas d'entrée dupliquée)
  const uniqueProducts = Array.from(new Map(products.map((p) => [p.id, p])).values())
  const [selectedCategory, setSelectedCategory] = useState("all")
  // Simple client-side cart state
  const [cart, setCart] = useState([])
  const cartRef = useRef(null)
  // control cart visibility on small screens
  const [cartVisible, setCartVisible] = useState(false)

  const addToCart = (product, color, size, flocking) => {
    const key = `${product.id}::${color}::${size}::${flocking}`
    setCart((prev) => {
      const existing = prev.find((it) => it.key === key)
      if (existing) {
        return prev.map((it) => it.key === key ? { ...it, qty: it.qty + 1 } : it)
      }
      const image = (product.images && product.images[0]) || product.image || ''
      return [...prev, { key, productId: product.id, name: product.name, color, size, flocking, qty: 1, price: product.price, image }]
    })
    // show cart on mobile and scroll to the cart on the page
    setCartVisible(true)
    // wait a tick for DOM updates then scroll
    setTimeout(() => {
      if (cartRef.current) {
        cartRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
      } else {
        // fallback: scroll to top of page area
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }, 120)
  }

  const removeFromCart = (key) => {
    setCart((prev) => prev.filter((it) => it.key !== key))
  }

  const cartTotal = cart.reduce((s, it) => s + (it.price || 0) * (it.qty || 1), 0)

  const categories = [
    { key: "all", label: "Tous" },
    { key: "tshirt-coton", label: "T-shirt coton" },
    { key: "tshirt-sport", label: "T-shirt sport" },
    { key: "sweat-capuche", label: "Sweat capuche" },
    { key: "jogging", label: "Jogging" },
    { key: "debardeur-coton", label: "Débardeur coton" },
    { key: "debardeur-sport", label: "Débardeur sport" },
  ]

  const filteredProducts = selectedCategory === "all" ? uniqueProducts : uniqueProducts.filter((p) => p.category === selectedCategory)

  return (
    <Layout title="Boutique - Club de Basket Combourg">
      <h1 className="text-4xl font-bold mb-6 text-center">Boutique</h1>

      <div className="w-full">
        <div className="mx-auto max-w-6xl px-6">
          {/* Mobile: button to show/hide cart so it doesn't occupy full page */}
          <div className="mb-4 lg:hidden text-right">
            <button
              onClick={() => setCartVisible((v) => !v)}
              className="inline-block px-4 py-2 bg-green-600 text-white rounded"
            >
              {cartVisible ? 'Masquer le panier' : `Voir le panier (${cart.length})`}
            </button>
          </div>
          <div className="grid grid-cols-12 gap-6">
            {/* Left: products area (takes 8 columns) */}
            <div className="col-span-12 lg:col-span-8">
              <h2 className="text-2xl font-semibold mb-4">Produits</h2>

              {/* Barre de filtres */}
              <div className="flex flex-wrap gap-3 mb-6">
                {categories.map((c) => (
                  <button
                    key={c.key}
                    onClick={() => setSelectedCategory(c.key)}
                    className={`px-4 py-2 rounded ${selectedCategory === c.key ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-200'}`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id}>
                    <ProductCard product={product} addToCart={addToCart} />
                  </div>
                ))}
              </div>
            </div>

            {/* Right: cart sidebar (takes 4 columns) */}
            <aside className="col-span-12 lg:col-span-4">
              <div className="cart-sidebar border border-gray-500 rounded-lg p-4 max-h-[70vh] overflow-y-auto">
                {/* On small screens, hide content unless cartVisible is true */}
                <div className={`${cartVisible ? 'block' : 'hidden'} lg:block`}>
                  <h3 className="text-xl font-semibold text-white mb-4 text-center">Votre panier</h3>
                  {cart.length === 0 ? (
                    <div className="text-sm text-gray-300 text-center">Votre panier est vide.</div>
                  ) : (
                    <div className="space-y-3">
                      {cart.map((it) => (
                        <div key={it.key} className="flex items-center gap-3 bg-[#1b1b1b] p-2 rounded">
                          {it.image && <img src={it.image} alt={it.name} className="w-16 h-16 object-contain rounded" />}
                          <div className="flex-1 text-left">
                            <div className="font-semibold">{it.name}</div>
                            <div className="text-sm text-gray-300">{it.color} • {it.size} • {it.flocking}</div>
                            <div className="text-sm text-gray-200">{it.qty} × {it.price}€</div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">{(it.price * it.qty).toFixed(2)}€</div>
                            <button onClick={() => removeFromCart(it.key)} className="text-sm text-red-500 mt-2">Retirer</button>
                          </div>
                        </div>
                      ))}
                      <div className="pt-2 border-t border-gray-600 text-right">
                        <div className="text-lg font-bold">Total: {cartTotal.toFixed(2)}€</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </Layout>
  );
}