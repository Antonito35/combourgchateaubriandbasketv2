"use client"

import { useState } from "react"
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"
import Image from "next/image"

export default function ShoppingCart({ cart, removeFromCart, stripeEnabled = true }) {
  const [customerInfo, setCustomerInfo] = useState({ name: "", email: "", address: "" })
  const [isProcessing, setIsProcessing] = useState(false)
  const stripe = stripeEnabled ? useStripe() : null
  const elements = stripeEnabled ? useElements() : null

  const formatter = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 0 })
  const total = cart.reduce((sum, item) => sum + (item.totalPrice || 0), 0)

  const handleCheckout = async (e) => {
    e.preventDefault()
    if (!stripeEnabled) {
      alert('Paiement désactivé — clé Stripe publishable non définie.')
      return
    }

    if (!stripe || !elements) return

    setIsProcessing(true)

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart,
          customerInfo,
        }),
      })

      const session = await response.json()

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      })

      if (result.error) {
        console.error(result.error.message)
        alert("Une erreur est survenue lors de la redirection vers le paiement.")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Une erreur est survenue lors de la création de la session de paiement.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="bg-custom-gray text-white rounded-lg p-4 shadow flex flex-col">
      <h2 className="text-2xl font-semibold mb-4">Votre panier</h2>

      {cart.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-gray-200">Votre panier est vide.</p>
        </div>
      ) : (
        <>
          {/* Liste des articles : rendu dans un container défilable */}
          <div style={{ maxHeight: '40vh', overflowY: 'auto' }} className="mb-4 pr-2">
            <ul className="space-y-4">
              {cart.map((item, index) => (
                <li key={index} className="flex gap-3 items-center p-3 rounded-lg" style={{ backgroundColor: '#444' }}>
                  <div className="flex-shrink-0 w-20 h-20 bg-gray-700 rounded overflow-hidden">
                    {item.image ? (
                      <Image src={item.image} alt={item.name} width={80} height={80} className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">Image</div>
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-sm text-gray-200 flex items-center gap-2">
                          <span
                            className="w-4 h-4 rounded-full inline-block"
                            style={{
                              backgroundColor: item.color ? (item.color.toLowerCase() === 'blanc' ? '#ffffff' : item.color.toLowerCase() === 'noir' ? '#000000' : item.color) : 'transparent',
                              border: item.color && item.color.toLowerCase() === 'blanc' ? '1px solid #ccc' : '1px solid rgba(0,0,0,0.2)'
                            }}
                            aria-hidden
                          />
                          {item.color} · {item.size}{item.flocking ? ` · ${item.flocking}` : ""}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatter.format(item.totalPrice)}</p>
                      </div>
                    </div>
                    <div className="mt-2 flex gap-2">
                      <button onClick={() => removeFromCart(index)} className="text-sm text-yellow-300 hover:underline">Supprimer</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Totaux + formulaire : toujours visibles sous la liste */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium">Total</span>
              <span className="text-xl font-bold">{formatter.format(total)}</span>
            </div>

            <form onSubmit={handleCheckout} className="space-y-4">
              <input
                type="text"
                placeholder="Nom"
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                className="w-full p-3 text-lg border rounded-md bg-[#2d3b49] text-white placeholder:text-gray-300"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={customerInfo.email}
                onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                className="w-full p-3 text-lg border rounded-md bg-[#2d3b49] text-white placeholder:text-gray-300"
                required
              />
              <textarea
                placeholder="Adresse"
                value={customerInfo.address}
                onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                className="w-full p-3 text-lg border rounded-md bg-[#2d3b49] text-white placeholder:text-gray-300 min-h-[120px]"
                required
              />

              {stripeEnabled ? (
                <>
                  <div className="p-3 border rounded-md" style={{ backgroundColor: '#27333f', minHeight: 64 }}>
                    <div style={{ height: '48px', display: 'flex', alignItems: 'center' }}>
                      <CardElement options={{ style: { base: { color: "#ffffff", fontSize: '16px', '::placeholder': { color: '#9ca3af' } } } }} />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={!stripe || isProcessing}
                    className="w-full bg-custom-blue text-white px-6 py-3 rounded-md hover:bg-[#2a4b73] disabled:bg-gray-500 text-lg font-semibold"
                  >
                    {isProcessing ? "Traitement..." : "Procéder au paiement"}
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => alert('Paiement désactivé — clé Stripe publishable non définie.')}
                  className="w-full bg-gray-500 text-white px-6 py-3 rounded-md text-lg font-semibold"
                >
                  Paiement désactivé
                </button>
              )}
            </form>
          </div>
        </>
      )}
    </div>
  )
}

