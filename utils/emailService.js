import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

export const sendConfirmationEmail = async ({ customerEmail, orderDetails, total }) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: customerEmail,
      subject: "Confirmation de commande - Club de Basket Combourg",
      html: `
        <h1>Merci pour votre commande !</h1>
        <p>Votre paiement a été traité avec succès.</p>
         <ul>
          ${orderDetails.map((item) => `<li>${item.quantity} x ${item.description} - ${item.amount / 100}€</li>`).join("")}
        </ul>
        <p><strong>Total :</strong> ${total}€</p>
        <p>Vous recevrez prochainement vos articles.</p>
      `,
    }

    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'e-mail :", error)
    throw error
  }
}

