const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env.local');
if (!fs.existsSync(envPath)) {
  console.error('.env.local not found at', envPath);
  process.exit(2);
}

const content = fs.readFileSync(envPath, 'utf8');
const lines = content.split(/\r?\n/);
let found = null;
for (const line of lines) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  if (trimmed.startsWith('STRIPE_SECRET_KEY=')) {
    found = trimmed.substring('STRIPE_SECRET_KEY='.length);
    break;
  }
}

if (found === null) {
  console.error('STRIPE_SECRET_KEY not found in .env.local');
  process.exit(3);
}

// Show raw (escaped) and a cleaned, masked value
console.log('raw value (as in file):', found);
const cleaned = found.trim().replace(/^"|"$/g, "");
const masked = cleaned ? `${cleaned.slice(0,6)}...${cleaned.slice(-4)}` : '<empty>';
console.log('cleaned (masked):', masked);
console.log('looks like stripe key prefix:', /^(sk_(test|live)_)/.test(cleaned));

// exit 0
process.exit(0);
