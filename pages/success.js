"use client"

import { useEffect } from "react"
import { useRouter } from "next/router"
import Layout from "../components/Layout"

export default function Success() {
  const router = useRouter()
  const { session_id } = router.query

  useEffect(() => {
    if (session_id) {
      // Filet de sécurité côté client : le webhook Stripe (pages/api/webhook.js)
      // est désormais la source fiable pour l'envoi des e-mails. Cet appel est
      // idempotent (sendOrderEmails ignore les doublons) donc il ne fait rien
      // de mal si le webhook a déjà envoyé les e-mails.
      fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId: session_id }),
      }).then((res) => {
        if (!res.ok) {
          console.error("Echec de l'envoi de l'e-mail de confirmation (fallback client)")
        }
      }).catch((err) => {
        console.error("Echec de l'envoi de l'e-mail de confirmation (fallback client):", err)
      })
    }
  }, [session_id])

  return (
    <Layout title="Commande réussie - Club de Basket Combourg">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Merci pour votre commande !</h1>
        <p className="mb-4">Votre paiement a été traité avec succès.</p>
        <p>Un e-mail de confirmation vous sera envoyé prochainement.</p>
      </div>
      
    </Layout>
  )
}

