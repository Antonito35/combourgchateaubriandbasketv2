"use client";



import { useState } from "react";

import Link from "next/link";

import Layout from "../components/Layout";

import ProductCard from "../components/ProductCard";



const products = [

  { id: 1, name: "T-shirt", price: 50, image: "/images/image.png" },

  { id: 2, name: "Polo", price: 1, image: "/images/image.png" },

  { id: 3, name: "Pull", price: 80, image: "/images/image.png" },

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

      <h1 className="text-4xl font-bold mb-6">Boutique</h1>

      <div className="w-full">

        <div className="mx-auto max-w-6xl px-4">

          <h2 className="text-2xl font-semibold mb-4 text-center">Produits</h2>



          {/* Barre de filtres */}

          <div className="flex flex-wrap gap-3 justify-center mb-6">

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



          <div className="boutique-grid">

            {filteredProducts.map((product) => (

              <div key={product.id} className="w-full max-w-sm">

                <ProductCard product={product} />

              </div>

            ))}

          </div>

  </div>



        {/* Bouton centré sous les articles */}

        <div className="mt-8 flex justify-center">

          <Link href="/cart" className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow-lg">

            Voir le panier

          </Link>

        </div>

      </div>

    </Layout>

  );

}