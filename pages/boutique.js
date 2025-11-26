"use client";

import { useState, useRef } from "react";
import { loadStripe } from '@stripe/stripe-js'
import Link from "next/link";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";

// ====================================================================
// START: CheckoutForm COMPONENT (avec la correction de la logique de paiement)
// ====================================================================

function CheckoutForm({ cart, cartTotal, useMock }) {
  const [name, setName] = useState("")
  const [firstName, setFirstName] = useState("")
  const [email, setEmail] = useState("")
  const [addressLine, setAddressLine] = useState("")
  const [city, setCity] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [phone, setPhone] = useState("")
  const [processing, setProcessing] = useState(false)

  const handleCheckout = async () => {
    // Vérifications initiales
    if (!cart || cart.length === 0) {
      alert('Votre panier est vide.')
      return
    }
    if (!firstName || !name || !email) {
      alert('Veuillez renseigner votre prénom, nom et votre email.')
      return
    }

    setProcessing(true)
    try {
      const payloadCart = cart.map((it) => ({
        name: it.name,
        color: it.color,
        size: it.size,
        flocking: it.flocking,
        price: it.price,
        qty: it.qty || 1,
      }))
      // Build structured customer info and validate required fields
      const customerInfo = {
        name: `${firstName.trim()} ${name.trim()}`.trim(),
        firstName: firstName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        addressLine: addressLine.trim(),
        city: city.trim(),
        postalCode: postalCode.trim(),
      }

      const missing = []
      if (!customerInfo.firstName) missing.push('Prénom')
      if (!customerInfo.name) missing.push('Nom')
      if (!customerInfo.email) missing.push('Email')
      if (!customerInfo.phone) missing.push('Téléphone')
      if (!customerInfo.addressLine) missing.push('Adresse (ligne)')
      if (!customerInfo.city) missing.push('Ville')
      if (!customerInfo.postalCode) missing.push('Code postal')
      if (missing.length > 0) {
        alert('Veuillez renseigner les champs obligatoires : ' + missing.join(', '))
        setProcessing(false)
        return
      }

      // --- 1. Mode Mock (si demandé) ---
      if (useMock) {
        try {
          const mockRes = await fetch('/api/mock-create-checkout-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cart: payloadCart, customerInfo }),
          })
          const mockData = await mockRes.json()
          // Redirection directe vers la page de succès pour la simulation
          window.location.href = `/success?session_id=${mockData.id}`
        } catch (errMock) {
          console.error('mock fallback failed', errMock)
          alert('Erreur lors du mock payment: ' + (errMock.message || errMock))
        }
        setProcessing(false)
        return
      }

      // --- 2. Mode Production (Appel API Stripe Réel) ---
      console.log('[checkout] Calling /api/create-checkout-session...')
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart: payloadCart, customerInfo }),
      })

      console.log('[checkout] API response status:', res.status)
      const data = await res.json()
      console.log('[checkout] API response data:', data)

      // 🛑 GESTION D'ERREUR CRITIQUE : Arrêtez si l'API a échoué (400 ou 500)
      if (!res.ok || !data.id) {
        console.error('create-checkout-session failed:', data)
        alert(`Erreur lors de la création de la session de paiement.\nDétails: ${data.message || 'Erreur inconnue'}\nVérifiez les logs Vercel/Terminal.`)
        setProcessing(false)
        return
      }

      const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
      console.log('[checkout] Publishable key present:', !!publishableKey)

      // 🛑 GESTION D'ERREUR STRIPE : Arrêtez si la clé publique manque
      if (!publishableKey) {
         alert('Erreur de configuration : Clé Stripe Publique manquante.')
         setProcessing(false)
         return
      }
      
      // --- 3. Initialisation et Redirection vers Stripe ---
      console.log('[checkout] Loading Stripe.js...')
      const stripe = await loadStripe(publishableKey)
      
      if (!stripe) {
        alert('Erreur: Impossible de charger le service de paiement Stripe.')
        setProcessing(false)
        return
      }

      console.log('[checkout] Redirecting to Stripe Checkout with session:', data.id)
      const result = await stripe.redirectToCheckout({ sessionId: data.id })
      
      // Si stripe.redirectToCheckout échoue (très rare)
      if (result && result.error) {
        console.error('stripe.redirectToCheckout error:', result.error)
        alert(`Erreur de redirection vers le paiement:\n${result.error.message}\n\nSi le problème persiste, vérifiez que votre compte Stripe est activé pour les paiements live.`)
      }

    } catch (err) {
      console.error(err)
      alert('Erreur inattendue: ' + (err.message || err))
    } finally {
      // Le traitement est terminé, que la redirection ait réussi ou échoué.
      setProcessing(false)
    }
  }

  return (
    <div className="mt-3">
      <input className="w-full mb-2 p-2 rounded bg-transparent border border-gray-600 text-white" placeholder="Prénom *" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <input className="w-full mb-2 p-2 rounded bg-transparent border border-gray-600 text-white" placeholder="Nom *" value={name} onChange={(e) => setName(e.target.value)} />
      <input className="w-full mb-2 p-2 rounded bg-transparent border border-gray-600 text-white" placeholder="Email *" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="w-full mb-2 p-2 rounded bg-transparent border border-gray-600 text-white" placeholder="Téléphone *" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <input className="w-full mb-2 p-2 rounded bg-transparent border border-gray-600 text-white" placeholder="Adresse (ligne) *" value={addressLine} onChange={(e) => setAddressLine(e.target.value)} />
      <div className="flex gap-2">
        <input className="flex-1 mb-2 p-2 rounded bg-transparent border border-gray-600 text-white" placeholder="Ville *" value={city} onChange={(e) => setCity(e.target.value)} />
        <input className="w-28 mb-2 p-2 rounded bg-transparent border border-gray-600 text-white" placeholder="Code postal *" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
      </div>
      <div className="text-sm text-gray-300 mb-2">Montant à payer: <strong>{cartTotal.toFixed(2)}€</strong></div>
      <button onClick={handleCheckout} disabled={processing} className="w-full bg-green-600 text-white py-2 rounded">
        {processing ? 'Redirection vers le paiement...' : 'Payer'}
      </button>
    </div>
  )
}

// ====================================================================
// END: CheckoutForm COMPONENT
// ====================================================================

const products = [
  // T-shirts coton
  { id: 1, name: "T-shirt coton logo coeur", price: 14, images: [
      "/images/img boutique/t-shirt coton/devant t-shirt logo coeur blanc.png",
      "/images/img boutique/t-shirt coton/dos t-shirt logo coeur blanc.png",
    ], colors: ["Blanc","Noir"], imagesByColor: {
      Blanc: [
        "/images/img boutique/t-shirt coton/devant t-shirt logo coeur blanc.png",
        "/images/img boutique/t-shirt coton/dos t-shirt logo coeur blanc.png",
      ],
      Noir: [
        "/images/img boutique/t-shirt coton/devant t-shirt logo coeur noir.png",
        "/images/img boutique/t-shirt coton/dos t-shirt logo coeur noir.png",
      ]
    }, category: "tshirt-coton" },
  { id: 2, name: "T-shirt coton logo dos", price: 18, images: [
      "/images/img boutique/t-shirt coton/devant t-shirt logo dos blanc.png",
      "/images/img boutique/t-shirt coton/dos t-shirt logo dos blanc.png",
    ], colors: ["Blanc","Noir"], imagesByColor: {
      Blanc: [
        "/images/img boutique/t-shirt coton/devant t-shirt logo dos blanc.png",
        "/images/img boutique/t-shirt coton/dos t-shirt logo dos blanc.png",
      ],
      Noir: [
        "/images/img boutique/t-shirt coton/devant t-shirt logo dos noir.png",
        "/images/img boutique/t-shirt coton/dos t-shirt logo dos noir.png",
      ]
    }, category: "tshirt-coton" },

  // T-shirts sport
  { id: 3, name: "T-shirt sport logo coeur", price: 15, images: [
      "/images/img boutique/t-shirt sport/devant t-shirt logo coeur blanc.png",
      "/images/img boutique/t-shirt sport/dos t-shirt logo coeur blanc.png",
    ], colors: ["Blanc","Noir"], imagesByColor: {
      Blanc: [
        "/images/img boutique/t-shirt sport/devant t-shirt logo coeur blanc.png",
        "/images/img boutique/t-shirt sport/dos t-shirt logo coeur blanc.png",
      ],
      Noir: [
        "/images/img boutique/t-shirt sport/devant t-shirt logo coeur noir.png",
        "/images/img boutique/t-shirt sport/dos t-shirt logo coeur noir.png",
      ]
    }, category: "tshirt-sport" },
  { id: 4, name: "T-shirt sport logo dos", price: 19, images: [
      "/images/img boutique/t-shirt sport/devant t-shirt logo dos blanc.png",
      "/images/img boutique/t-shirt sport/dos t-shirt logo dos blanc.png",
    ], colors: ["Blanc","Noir"], imagesByColor: {
      Blanc: [
        "/images/img boutique/t-shirt sport/devant t-shirt logo dos blanc.png",
        "/images/img boutique/t-shirt sport/dos t-shirt logo dos blanc.png",
      ],
      Noir: [
        "/images/img boutique/t-shirt sport/devant t-shirt logo dos noir.png",
        "/images/img boutique/t-shirt sport/dos t-shirt logo dos noir.png",
      ]
    }, category: "tshirt-sport" },

  // Sweats à capuche
  { id: 5, name: "Sweat à capuche logo coeur", price: 32, images: [
      "/images/img boutique/sweat a capuche/devant sweat a capuche logo coeur.png",
      "/images/img boutique/sweat a capuche/dos sweat a capuche logo coeur.png",
  // Sweats à capuche
    ], category: "sweat-capuche" },
  { id: 6, name: "Sweat à capuche logo dos", price: 36, images: [
      "/images/img boutique/sweat a capuche/devant sweat a capuche logo dos.png",
      "/images/img boutique/sweat a capuche/dos sweat a capuche logo dos.png",
    ], category: "sweat-capuche" },
  { id: 7, name: "Sweat zippé logo coeur", price: 38, images: [
      "/images/img boutique/sweat zippé/devant sweat zippé logo coeur blanc.png",
      "/images/img boutique/sweat zippé/dos sweat zippé logo coeur blanc.png",
    ], colors: ["Blanc","Noir"], imagesByColor: {
      Blanc: [
        "/images/img boutique/sweat zippé/devant sweat zippé logo coeur blanc.png",
        "/images/img boutique/sweat zippé/dos sweat zippé logo coeur blanc.png",
      ],
      Noir: [
        "/images/img boutique/sweat zippé/devant sweat zippé logo coeur noir.png",
        "/images/img boutique/sweat zippé/dos sweat zippé logo coeur noir.png",
      ]
    }, category: "sweat-capuche" },
  { id: 8, name: "Sweat zippé logo dos", price: 38, images: [
      "/images/img boutique/sweat zippé/devant sweat zippé logo dos blanc.png",
      "/images/img boutique/sweat zippé/dos sweat zippé logo dos blanc.png",
    ], colors: ["Blanc","Noir"], imagesByColor: {
      Blanc: [
        "/images/img boutique/sweat zippé/devant sweat zippé logo dos blanc.png",
        "/images/img boutique/sweat zippé/dos sweat zippé logo dos blanc.png",
      ],
      Noir: [
        "/images/img boutique/sweat zippé/devant sweat zippé logo dos noir.png",
        "/images/img boutique/sweat zippé/dos sweat zippé logo dos noir.png",
      ]
    }, category: "sweat-capuche" },

  // Jogging
  { id: 9, name: "Jogging", price: 36, images: [
      "/images/img boutique/jogging/jogging noir.png",
    ], category: "jogging" },

  // Débardeurs coton
  { id: 10, name: "Débardeur coton logo coeur", price: 14, images: [
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
    }, category: "debardeur-coton" },
  { id: 11, name: "Débardeur coton logo dos", price: 18, images: [
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
    }, category: "debardeur-coton" },

  // Débardeurs sport (utilisent les mêmes images que les débardeurs coton)
  { id: 12, name: "Débardeur sport logo coeur", price: 14, images: [
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
    }, category: "debardeur-sport" },
  { id: 13, name: "Débardeur sport logo dos", price: 18, images: [
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
  const [useMock, setUseMock] = useState(false)

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
              <div ref={cartRef} className="cart-sidebar border border-gray-500 rounded-lg p-4 max-h-[70vh] overflow-y-auto">
                {/* On small screens, hide content unless cartVisible is true */}
                <div className={`${cartVisible ? 'block' : 'hidden'} lg:block`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-white">Votre panier</h3>
                  </div>
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
                  {/* Checkout form */}
                  <div className="mt-4">
                    <h4 className="text-md font-semibold text-white mb-2">Informations de paiement</h4>
                    <CheckoutForm
                      cart={cart}
                      cartTotal={cartTotal}
                      useMock={useMock}
                    />
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </Layout>
  );
}