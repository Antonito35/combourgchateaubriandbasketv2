import Stripe from "stripe"

export default async function handler(req, res) {
  if (!process.env.STRIPE_SECRET_KEY) {
    res.status(500).json({ statusCode: 500, message: "STRIPE_SECRET_KEY not set in environment" })
    return
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

  if (req.method === "POST") {
    try {
      const { cart, customerInfo } = req.body

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: cart.map((item) => ({
          price_data: {
            currency: "eur",
            product_data: {
              name: `${item.name} (${item.color}, ${item.size}${item.flocking ? `, Floquage: ${item.flocking}` : ""})`,
            },
            unit_amount: item.totalPrice * 100, // Stripe utilise les centimes
          },
          quantity: 1,
        })),
        mode: "payment",
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/boutique`,
        customer_email: customerInfo.email,
        metadata: {
          customerName: customerInfo.name,
          customerAddress: customerInfo.address,
        },
      })

      res.status(200).json({ id: session.id })
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message })
    }
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}

