import crypto from 'crypto';

const secret = process.env.NODE_SECRET;
const salt = process.env.NODE_SALT;
const cryptoAlgorithm = process.env.NODE_CRYPTO_ALGORITHM;

export const encrypt = text => {
  const key = crypto.scryptSync(secret, salt, 24);
  const iv = Buffer.alloc(16, 0);
  const cipher = crypto.createCipheriv(cryptoAlgorithm, key, iv);

  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return encrypted;
};

export const decrypt = encrypted => {
  const key = crypto.scryptSync(secret, salt, 24);
  const iv = Buffer.alloc(16, 0);

  const decipher = crypto.createDecipheriv(cryptoAlgorithm, key, iv);

  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
};
