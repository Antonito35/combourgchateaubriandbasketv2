import Stripe from "stripe"
import { buffer } from "micro"
import { sendConfirmationEmail } from "../../utils/emailService"

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
  if (!process.env.STRIPE_SECRET_KEY) {
    res.status(500).json({ message: "STRIPE_SECRET_KEY not set in environment" })
    return
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

  if (req.method === "POST") {
    const buf = await buffer(req)
    const sig = req.headers["stripe-signature"]

    let event

    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret)
    } catch (err) {
      console.error(`Webhook Error: ${err.message}`)
      return res.status(400).send(`Webhook Error: ${err.message}`)
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object

      try {
        // Récupérer les détails de la commande
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id)

        // Envoyer l'e-mail de confirmation
        await sendConfirmationEmail({
          customerEmail: session.customer_details.email,
          orderDetails: lineItems.data,
          total: session.amount_total / 100, // Convertir les centimes en euros
        })

        console.log("E-mail de confirmation envoyé avec succès")
      } catch (error) {
        console.error("Erreur lors de l'envoi de l'e-mail de confirmation:", error)
      }
    }

    res.json({ received: true })
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}

