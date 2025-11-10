import nodemailer from "nodemailer"
import Stripe from "stripe"

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { sessionId } = req.body

    if (!process.env.STRIPE_SECRET_KEY) {
      res.status(500).json({ message: "STRIPE_SECRET_KEY not set in environment" })
      return
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

    try {
      // Récupérer les détails de la session Stripe
      const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["line_items"],
      })

      const customerEmail = session.customer_email
      const customerName = session.metadata.customerName
      const customerAddress = session.metadata.customerAddress
      const orderDetails = session.line_items.data
      const total = session.amount_total / 100 // Convertir les centimes en euros

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

      // Formater les détails de la commande pour l'e-mail
      const orderItemsList = orderDetails
        .map(
          (item) => `
        <li style="margin-bottom: 10px;">
          ${item.description} - ${item.amount_total / 100}€
        </li>
      `,
        )
        .join("")

      const mailOptions = {
        from: `"Club de Basket Combourg" <${process.env.EMAIL_USER}>`,
        to: "a.lemesle26@gmail.com",
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

