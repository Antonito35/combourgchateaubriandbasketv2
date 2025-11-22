// Usage (PowerShell):
// $env:STRIPE_SECRET_KEY = 'sk_test_xxx' ; node .\scripts\verify_stripe_key.js
// The script prints a masked version of the key and tries to retrieve the Stripe account.

const Stripe = require('stripe')

const raw = process.env.STRIPE_SECRET_KEY || ''
const clean = raw.trim().replace(/^"|"$/g, '')

function mask(k) {
  if (!k) return '<empty>'
  return `${k.slice(0,6)}...${k.slice(-4)}`
}

console.log('[verify_stripe_key] raw present:', raw ? 'yes' : 'no')
console.log('[verify_stripe_key] cleaned (masked):', mask(clean))

if (!clean) {
  console.error('[verify_stripe_key] STRIPE_SECRET_KEY not set. Export it before running this script.')
  process.exit(2)
}

const stripe = new Stripe(clean)

;(async () => {
  try {
    // try a lightweight request: retrieve the account
    const acc = await stripe.accounts.retrieve()
    console.log('[verify_stripe_key] Account retrieved, id (masked):', mask(acc.id || ''))
    console.log('[verify_stripe_key] Key appears valid and has access to the Stripe API.')
    process.exit(0)
  } catch (err) {
    // Print safe diagnostics
    console.error('[verify_stripe_key] Stripe API call failed:')
    if (err && err.message) console.error(err.message)
    if (err && err.code) console.error('code:', err.code)
    // Common case: Invalid API Key provided
    process.exit(3)
  }
})()
