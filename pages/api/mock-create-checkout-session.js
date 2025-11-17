// Mock endpoint pour tests locaux sans Stripe
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
    return
  }

  const { cart } = req.body || {}
  if (!cart || !Array.isArray(cart) || cart.length === 0) {
    res.status(400).json({ statusCode: 400, message: 'Cart is empty or invalid' })
    return
  }

  // Retourne un faux ID de session pour permettre au front d'ouvrir /success
  const mockId = `mock_cs_${Date.now()}`
  res.status(200).json({ id: mockId })
}