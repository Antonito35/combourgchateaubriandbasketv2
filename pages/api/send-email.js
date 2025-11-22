import nodemailer from "nodemailer"
import Stripe from "stripe"

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { sessionId } = req.body

    // Nettoie la clé d'environnement pour éviter les espaces ou guillemets parasites
    const rawKey = process.env.STRIPE_SECRET_KEY || ''
    const stripeSecret = rawKey.trim().replace(/^\"|\"$/g, '')
    if (!stripeSecret) {
      res.status(500).json({ message: "STRIPE_SECRET_KEY not set in environment" })
      return
    }

    const stripe = new Stripe(stripeSecret)

    try {
      // Récupérer les détails de la session Stripe
      const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["line_items"],
      })

      const customerEmail = session.customer_email
      const customerName = session.metadata.customerName
      const customerAddress = session.metadata.customerAddress
      // If cart JSON was attached to metadata use it for detailed items (includes size/color/flocking)
      let cartFromMetadata = []
      try {
        cartFromMetadata = session.metadata && session.metadata.cart ? JSON.parse(session.metadata.cart) : []
      } catch (e) {
        cartFromMetadata = []
      }
      const orderDetails = cartFromMetadata.length ? cartFromMetadata : session.line_items.data
      const total = session.amount_total ? session.amount_total / 100 : orderDetails.reduce((s, it) => s + ((it.price || it.amount || 0) * (it.quantity || it.qty || 1)) / 100, 0)

      // Configurer le transporteur d'e-mail
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      })

      // Formater les détails de la commande pour l'e-mail: support both metadata-cart items and Stripe line_items
      const orderItemsList = (orderDetails || [])
        .map((item) => {
          // If item comes from metadata (our cart), it will have name, size, color, flocking, price, qty
          if (item.name || item.price) {
            const qty = item.qty || item.quantity || 1
            const price = (item.price != null ? item.price : (item.amount_total ? item.amount_total / 100 : 0))
            const descriptors = []
            if (item.color) descriptors.push(item.color)
            if (item.size) descriptors.push(item.size)
            if (item.flocking) descriptors.push(item.flocking)
            const desc = descriptors.length ? ` (${descriptors.join(' • ')})` : ''
            return `\n        <li style="margin-bottom: 10px;">${qty} × ${item.name}${desc} — ${price}€</li>`
          }
          // Otherwise assume Stripe line_item format
          const descText = item.description || (item.price && item.price.product && item.price.product.name) || 'Article'
          const amount = item.amount_total ? item.amount_total / 100 : (item.price && item.price.unit_amount ? item.price.unit_amount / 100 : 0)
          const qty = item.quantity || 1
          return `\n        <li style="margin-bottom: 10px;">${qty} × ${descText} — ${amount}€</li>`
        })
        .join("")

      const mailOptions = {
        from: `"Club de Basket Combourg" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER || 'a.lemesle26@gmail.com',
        // send a copy to the customer if we have their email
        cc: customerEmail || undefined,
        subject: "Nouvelle commande - Club de Basket Combourg",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #2a4363;">Nouvelle commande reçue</h1>
            <p><strong>Nom du client :</strong> ${customerName}</p>
            <p><strong>Email du client :</strong> ${customerEmail}</p>
            <p><strong>Adresse du client :</strong> ${customerAddress}</p>
            
            <h2 style="color: #2a4363;">Détails de la commande :</h2>
            <ul style="list-style-type: none; padding: 0;">
              ${orderItemsList}
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

      // Envoyer l'e-mail
      await transporter.sendMail(mailOptions)
      res.status(200).json({ message: "E-mail envoyé avec succès" })
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'e-mail:", error)
      res.status(500).json({ message: "Erreur lors de l'envoi de l'e-mail" })
    }
  } else {
    res.setHeader("Allow", ["POST"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

