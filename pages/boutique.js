"use client";

import { useState } from "react";
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
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>

            {/* Right: cart sidebar (takes 4 columns) */}
            <aside className="col-span-12 lg:col-span-4">
              <div className="cart-sidebar border border-gray-500 rounded-lg h-full">
                <h3 className="text-xl font-semibold text-white mb-4 text-center">Votre panier</h3>
                <div className="text-sm text-gray-300 text-center">Votre panier est vide.</div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </Layout>
  );
}