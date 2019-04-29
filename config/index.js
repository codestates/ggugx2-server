export const secret = process.env.NODE_SECRET || 'secret';
export const expireTime = process.env.NODE_EXPIRE_TIME || '1h';
export const salt = process.env.NODE_SALT || 'salt';
export const cryptoAlgorithm =
  process.env.NODE_CRYPTO_ALGORITHM || 'aes-192-cbc';
export const dbConfig = {
  username: process.env.NODE_DATABASE_USERNAME || 'root',
  password: process.env.NODE_DATABASE_PASSWORD || 'password',
  database: process.env.NODE_DATABASE_NAME || 'gguck2',
  host: process.env.NODE_DATABASE_HOST || '127.0.0.1',
  port: process.env.NODE_DATABASE_PORT || '3306',
  dialect: process.env.NODE_DATABASE_DIALECT || 'mysql'
};
export const accessKey = process.env.NODE_S3_API_ACCESSKEY;
export const secretAccessKey = process.env.NODE_S3_API_SECRETKEY;
