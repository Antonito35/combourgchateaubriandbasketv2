import Stripe from "stripe"
import { buffer } from "micro"
import { sendOrderEmails } from "../../utils/sendOrderEmails"

// Stripe needs the raw request body to verify the webhook signature.
export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
    return
  }

  const rawKey = process.env.STRIPE_SECRET_KEY || ""
  const stripeSecret = rawKey.trim().replace(/^"|"$/g, "")
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!stripeSecret) {
    console.error("[webhook] STRIPE_SECRET_KEY not set in environment")
    res.status(500).json({ message: "STRIPE_SECRET_KEY not set in environment" })
    return
  }
  if (!webhookSecret) {
    console.error("[webhook] STRIPE_WEBHOOK_SECRET not set in environment")
    res.status(500).json({ message: "STRIPE_WEBHOOK_SECRET not set in environment" })
    return
  }

  const stripe = new Stripe(stripeSecret)
  const sig = req.headers["stripe-signature"]

  let event
  try {
    const buf = await buffer(req)
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret)
  } catch (err) {
    console.error("[webhook] Signature verification failed:", err.message)
    res.status(400).send(`Webhook Error: ${err.message}`)
    return
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object
    try {
      const result = await sendOrderEmails(session.id)
      console.log(`[webhook] checkout.session.completed ${session.id}:`, result.alreadySent ? "already sent" : "emails sent")
    } catch (err) {
      // Log but still acknowledge the event so Stripe doesn't retry indefinitely
      // for a mail-server issue; the failure is visible in the server logs.
      console.error("[webhook] Failed to send order emails:", err)
    }
  }

  res.status(200).json({ received: true })
}
