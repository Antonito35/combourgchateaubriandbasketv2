const http = require('http')

const data = JSON.stringify({
  cart: [
    { name: 'Test Article', price: 10, qty: 1 }
  ],
  customerInfo: { email: 'test@example.com', name: 'Test User' }
})

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/create-checkout-session',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
}

const req = http.request(options, (res) => {
  let body = ''
  res.on('data', (chunk) => { body += chunk })
  res.on('end', () => {
    console.log('statusCode:', res.statusCode)
    try {
      console.log('response:', JSON.parse(body))
    } catch (e) {
      console.log('response (raw):', body)
    }
  })
})

req.on('error', (e) => {
  console.error('request error:', e.message)
})

req.write(data)
req.end()
