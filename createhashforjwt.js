const crypto = require('crypto');

// Generate a 64-byte random key
const key = crypto.randomBytes(64).toString('hex');

console.log(`Generated JWT Key: ${key}`);
