/*
  Credit to https://attacomsian.com/blog/nodejs-encrypt-decrypt-data
 */
import crypto from 'crypto';

const algorithm = 'aes-256-ctr';
const iv = null; // crypto.randomBytes(16);

export const encrypt = (text: string, key: string) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return encrypted.toString('hex');
};

export const decrypt = (hash: string, key: string) => {
  const decipher = crypto.createDecipheriv(algorithm, key, null);

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(hash, 'hex')),
    decipher.final(),
  ]);

  return decrypted.toString();
};

export default {
  encrypt,
  decrypt,
};
