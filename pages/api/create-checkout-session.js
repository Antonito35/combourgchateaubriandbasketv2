import Stripe from "stripe"

export default async function handler(req, res) {
  // Nettoie la clé d'environnement pour éviter les espaces ou guillemets parasites
  const rawKey = process.env.STRIPE_SECRET_KEY || ''
  const stripeSecret = rawKey.trim().replace(/^\"|\"$/g, '')
  // Log masqué pour debug local sans exposer la clé complète
  const masked = stripeSecret ? `${stripeSecret.slice(0,6)}...${stripeSecret.slice(-4)}` : '<empty>'
  console.log('[create-checkout-session] stripeSecret (masked):', masked)
  if (stripeSecret && !/^sk_(test|live)_/.test(stripeSecret)) {
    console.warn('[create-checkout-session] Warning: STRIPE_SECRET_KEY does not look like a standard Stripe key prefix (sk_test_ or sk_live_)')
  }
  if (!stripeSecret) {
    res.status(500).json({ statusCode: 500, message: "STRIPE_SECRET_KEY not set in environment" })
    return
  }

  const stripe = new Stripe(stripeSecret)

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
              // include color/size/flocking in product name for clarity
              name: `${item.name}${cart[idx]?.color ? ` (${cart[idx].color})` : ''}${cart[idx]?.size ? ` - ${cart[idx].size}` : ''}${cart[idx]?.flocking ? ` - ${cart[idx].flocking}` : ''}`,
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
          // attach entire cart as JSON so the webhook/email can show full item details
          cart: JSON.stringify(cart || []),
        },
      })

      console.log('[create-checkout-session] Session created successfully:', session.id)
      res.status(200).json({ id: session.id })
    } catch (err) {
      // Do not simulate success on authentication or other errors; return proper 500 so client shows an error.
      console.error('[create-checkout-session] error:', err)
      try {
        console.error('[create-checkout-session] err.type:', err && err.type)
        console.error('[create-checkout-session] err.code:', err && err.code)
        console.error('[create-checkout-session] err.rawType:', err && err.rawType)
      } catch (e) {}
      res.status(500).json({ statusCode: 500, message: err && (err.message || 'Internal server error') })
    }
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}

