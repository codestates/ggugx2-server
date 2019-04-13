const crypto = require('crypto');
const config = require('../config');

const encrypt = text => {
  console.log('text: ', text);
  const key = crypto.scryptSync(config.secret, config.salt, 24);
  console.log('key: ', key);
  const iv = Buffer.alloc(16, 0);
  console.log('iv: ', iv);
  const cipher = crypto.createCipheriv(config.cryptoAlgorithm, key, iv);
  console.log('cipher made');
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return encrypted;
};

const decrypt = encrypted => {
  const key = crypto.scryptSync(config.secret, config.salt, 24);
  const iv = Buffer.alloc(16, 0);

  const decipher = crypto.createDecipheriv(config.cryptoAlgorithm, key, iv);

  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
};

module.exports = { encrypt, decrypt };
