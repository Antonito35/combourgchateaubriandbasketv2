// Usage: node ./scripts/send_test_email.js
// This script loads .env.local (via dotenv) and sends a test email using EMAIL_USER/EMAIL_PASS.

const fs = require('fs')
const path = require('path')
const nodemailer = require('nodemailer')

// Simple .env.local parser (no external deps)
function loadEnvLocal(file) {
  try {
    const raw = fs.readFileSync(file, 'utf8')
    raw.split(/\r?\n/).forEach((line) => {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) return
      const eq = trimmed.indexOf('=')
      if (eq === -1) return
      const key = trimmed.slice(0, eq).trim()
      let val = trimmed.slice(eq + 1).trim()
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1)
      }
      process.env[key] = val
    })
  } catch (e) {
    // ignore
  }
}

loadEnvLocal(path.resolve(__dirname, '..', '.env.local'))

async function main() {
  const user = process.env.EMAIL_USER
  const pass = process.env.EMAIL_PASS || process.env.EMAIL_PASSWORD
  if (!user || !pass) {
    console.error('EMAIL_USER or EMAIL_PASS (or EMAIL_PASSWORD) not set in .env.local')
    process.exit(2)
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: Number(process.env.EMAIL_PORT || 587),
    secure: false,
    auth: { user, pass },
  })

  const mailOptions = {
    from: `"Test Mail" <${user}>`,
    to: user, // send to the configured email so you can check inbox
    subject: 'Test d\'envoi — Boutique Combourg',
    text: 'Ceci est un email de test envoyé depuis le script local. Si vous recevez cela, la configuration SMTP fonctionne.',
    html: '<p>Ceci est un <strong>email de test</strong> envoyé depuis le script local. Si vous recevez cela, la configuration SMTP fonctionne.</p>'
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log('Email envoyé, messageId:', info && info.messageId)
    process.exit(0)
  } catch (err) {
    console.error('Erreur lors de l\'envoi du mail :', err && err.message)
    process.exit(3)
  }
}

main()
