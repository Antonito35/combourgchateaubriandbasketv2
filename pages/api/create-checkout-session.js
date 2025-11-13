import Stripe from "stripe"

export default async function handler(req, res) {
  if (!process.env.STRIPE_SECRET_KEY) {
    res.status(500).json({ statusCode: 500, message: "STRIPE_SECRET_KEY not set in environment" })
    return
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

  if (req.method === "POST") {
    try {
      // Log incoming body to help debug locally (will appear in terminal)
      console.log('[create-checkout-session] incoming body:', req.body)

      const { cart, customerInfo } = req.body || {}

      if (!cart || !Array.isArray(cart) || cart.length === 0) {
        res.status(400).json({ statusCode: 400, message: 'Cart is empty or invalid' })
        return
      }

      // sanitize/normalize items
      const lineItems = cart.map((item) => {
        const price = Number(item.price || 0)
        const qty = Number(item.qty || 1)
        return {
          price,
          qty,
          name: String(item.name || 'Article')
        }
      })

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems.map((item, idx) => ({
          price_data: {
            currency: "eur",
            product_data: {
              name: `${item.name}${cart[idx]?.color ? ` (${cart[idx].color})` : ''}`,
            },
            unit_amount: Math.max(0, Math.round(item.price * 100)),
          },
          quantity: Math.max(1, Math.round(item.qty)),
        })),
        mode: "payment",
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/boutique`,
        customer_email: customerInfo?.email,
        metadata: {
          customerName: customerInfo?.name,
          customerAddress: customerInfo?.address,
        },
      })

      res.status(200).json({ id: session.id })
    } catch (err) {
      console.error('[create-checkout-session] error:', err)
      res.status(500).json({ statusCode: 500, message: err.message || 'Internal server error' })
    }
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}

