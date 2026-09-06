import { sendOrderEmails } from "../../utils/sendOrderEmails"

// Manual/fallback trigger (called from the /success page). The Stripe webhook
// (pages/api/webhook.js) is now the reliable primary sender; this endpoint is
// idempotent via sendOrderEmails, so calling it after the webhook already ran
// is a harmless no-op.
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
    return
  }

  const { sessionId } = req.body || {}
  if (!sessionId) {
    res.status(400).json({ message: "sessionId is required" })
    return
  }

  try {
    await sendOrderEmails(sessionId)
    res.status(200).json({ message: "E-mail envoyé avec succès" })
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'e-mail:", error)
    res.status(500).json({ message: "Erreur lors de l'envoi de l'e-mail" })
  }
}

