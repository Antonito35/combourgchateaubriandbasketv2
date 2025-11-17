const handleCheckout = async () => {
    // ... (vérifications initiales: panier, nom, email) ...

    setProcessing(true)
    try {
      const payloadCart = cart.map((it) => ({
        // ... logique de mapping du panier ...
      }))

      // 1. Logique Mock (laissez-la telle quelle, elle est correcte pour le test)
      if (useMock) {
        // ... Code Mock ...
        return
      }

      // 2. Appel API Réel Stripe
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart: payloadCart, customerInfo: { name, email, address } }),
      })

      const data = await res.json()
      
      // 3. Gestion des erreurs de l'API : Arrêter ici si l'API échoue.
      if (!res.ok || !data.id) {
        console.error('create-checkout-session failed:', data)
        alert(data.message || 'Erreur lors de la création de la session de paiement.')
        setProcessing(false)
        return
      }

      const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
      
      // 4. Charger Stripe
      const stripe = await loadStripe(publishableKey)
      if (!stripe) {
        alert('Erreur: Impossible de charger le service de paiement Stripe.')
        setProcessing(false)
        return
      }

      // 5. Redirection vers Stripe
      const result = await stripe.redirectToCheckout({ sessionId: data.id })
      
      // Si la redirection ÉCHOUÉ (ce qui est TRES rare)
      if (result && result.error) {
        console.error('stripe.redirectToCheckout error:', result.error)
        alert('Erreur de redirection vers le paiement: ' + result.error.message)
      }

    } catch (err) {
      console.error(err)
      alert('Erreur inattendue: ' + (err.message || err))
      
    } finally {
      // Le traitement est terminé, que la redirection ait réussi ou échoué.
      setProcessing(false)
    }
  }