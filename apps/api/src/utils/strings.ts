import crypto from 'crypto';

export const generateRandomString = (length = 64) =>
  crypto.randomBytes(length).toString('hex');

export default {
  generateRandomString,
};
