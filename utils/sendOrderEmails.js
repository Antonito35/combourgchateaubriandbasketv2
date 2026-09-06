import nodemailer from "nodemailer"
import Stripe from "stripe"

function getStripe() {
  const rawKey = process.env.STRIPE_SECRET_KEY || ""
  const stripeSecret = rawKey.trim().replace(/^"|"$/g, "")
  if (!stripeSecret) {
    throw new Error("STRIPE_SECRET_KEY not set in environment")
  }
  return new Stripe(stripeSecret)
}

function getTransporter() {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
}

function formatOrderItemsList(orderDetails) {
  return (orderDetails || [])
    .map((item) => {
      if (item.name || item.price) {
        const qty = item.qty || item.quantity || 1
        const price = item.price != null ? item.price : item.amount_total ? item.amount_total / 100 : 0
        const descriptors = []
        if (item.color) descriptors.push(item.color)
        if (item.size) descriptors.push(item.size)
        if (item.flocking) descriptors.push(item.flocking)
        const desc = descriptors.length ? ` (${descriptors.join(" • ")})` : ""
        return `\n        <li style="margin-bottom: 10px;">${qty} × ${item.name}${desc} — ${price}€</li>`
      }
      const descText = item.description || (item.price && item.price.product && item.price.product.name) || "Article"
      const amount = item.amount_total ? item.amount_total / 100 : item.price && item.price.unit_amount ? item.price.unit_amount / 100 : 0
      const qty = item.quantity || 1
      return `\n        <li style="margin-bottom: 10px;">${qty} × ${descText} — ${amount}€</li>`
    })
    .join("")
}

function formatOrderShortLines(orderDetails) {
  return (orderDetails || [])
    .map((item) => {
      if (item.name || item.price) {
        const qty = item.qty || item.quantity || 1
        const descriptors = []
        if (item.size) descriptors.push(`taille ${item.size}`)
        if (item.color) descriptors.push(item.color)
        if (item.flocking) descriptors.push(item.flocking)
        const desc = descriptors.length ? ` (${descriptors.join(" • ")})` : ""
        const price = item.price != null ? item.price : item.amount_total ? item.amount_total / 100 : 0
        return `${qty}× ${item.name}${desc} — ${price}€`
      }
      const descText = item.description || (item.price && item.price.product && item.price.product.name) || "Article"
      const amount = item.amount_total ? item.amount_total / 100 : item.price && item.price.unit_amount ? item.price.unit_amount / 100 : 0
      const qty = item.quantity || 1
      return `${qty}× ${descText} — ${amount}€`
    })
    .join("\n")
}

// Sends the admin recap + customer confirmation emails for a completed Checkout Session.
// Idempotent: flags the underlying PaymentIntent once sent, so it's safe to call this
// both from the Stripe webhook and from the /success page fallback without double-sending.
export async function sendOrderEmails(sessionId) {
  const stripe = getStripe()

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "payment_intent"],
  })

  const paymentIntent = session.payment_intent && typeof session.payment_intent === "object" ? session.payment_intent : null

  if (paymentIntent && paymentIntent.metadata && paymentIntent.metadata.emailSent === "true") {
    return { alreadySent: true }
  }

  const customerEmail = session.customer_email
  const customerName = session.metadata.customerName
  const customerFirstName = session.metadata.customerFirstName
  const customerPhone = session.metadata.customerPhone
  const customerCity = session.metadata.customerCity
  const customerPostalCode = session.metadata.customerPostalCode
  const customerAddressLine = session.metadata.customerAddressLine
  const customerAddress = [customerAddressLine, `${customerPostalCode || ""} ${customerCity || ""}`]
    .filter(Boolean)
    .join(" - ")

  let cartFromMetadata = []
  try {
    cartFromMetadata = session.metadata && session.metadata.cart ? JSON.parse(session.metadata.cart) : []
  } catch (e) {
    cartFromMetadata = []
  }
  const orderDetails = cartFromMetadata.length ? cartFromMetadata : session.line_items.data
  const total = session.amount_total
    ? session.amount_total / 100
    : orderDetails.reduce((s, it) => s + ((it.price || it.amount || 0) * (it.quantity || it.qty || 1)) / 100, 0)

  const transporter = getTransporter()

  const mailOptions = {
    from: `"Club de Basket Combourg" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER || "antoinesimon35270@gmail.com",
    cc: customerEmail || undefined,
    subject: "Nouvelle commande - Club de Basket Combourg",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2a4363;">Nouvelle commande reçue</h1>
        <p><strong>Prénom du client :</strong> ${customerFirstName || ""}</p>
        <p><strong>Nom du client :</strong> ${customerName || ""}</p>
        <p><strong>Email du client :</strong> ${customerEmail}</p>
        <p><strong>Téléphone du client :</strong> ${customerPhone || "N/A"}</p>
        <p><strong>Adresse du client :</strong> ${customerAddress}</p>

        <h2 style="color: #2a4363;">Détails de la commande :</h2>
        <ul style="list-style-type: none; padding: 0;">
          ${formatOrderItemsList(orderDetails)}
        </ul>

        <p style="font-size: 18px; margin-top: 20px;">
          <strong>Total de la commande :</strong> ${total}€
        </p>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #666;">
            Club de Basket Combourg<br>
            Avenue Waldmunchen, 35270 Combourg
          </p>
        </div>
      </div>
    `,
  }

  await transporter.sendMail(mailOptions)

  if (customerEmail) {
    const orderShortLines = formatOrderShortLines(orderDetails)
    const customerMailOptions = {
      from: `"Club de Basket Combourg" <${process.env.EMAIL_USER}>`,
      to: customerEmail,
      subject: "Confirmation de votre commande - Club de Basket Combourg",
      text: `Nous avons bien reçu votre commande.\n\n${orderShortLines}\n\nTotal: ${total}€\n\nMerci de votre confiance.`,
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;"><p>Nous avons bien reçu votre commande.</p><p><strong>Récapitulatif :</strong></p><pre style="white-space: pre-wrap;">${orderShortLines}</pre><p><strong>Total :</strong> ${total}€</p><p>Merci de votre confiance.</p></div>`,
    }

    try {
      await transporter.sendMail(customerMailOptions)
    } catch (e) {
      console.error("[sendOrderEmails] Erreur envoi e-mail client:", e)
    }
  }

  if (paymentIntent) {
    try {
      await stripe.paymentIntents.update(paymentIntent.id, {
        metadata: { emailSent: "true" },
      })
    } catch (e) {
      console.error("[sendOrderEmails] Impossible de marquer le paiement comme notifié:", e)
    }
  }

  return { alreadySent: false }
}
