import jwt from 'express-jwt';

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error('Error: JWT secret is missing from env');
}

export default jwt({
  secret,
  algorithms: ['HS256'],
  getToken: (req) => {
    if (req.headers.authorization?.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    } else if (req.query?.token) {
      return req.query.token;
    } else if (req.cookies?.token) {
      return req.cookies.token;
    }

    return null;
  },
});
