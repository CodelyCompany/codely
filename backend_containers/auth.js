const { expressjwt: expressJwt } = require('express-jwt');
const jwks = require('jwks-rsa');

require('dotenv').config();

const auth_url = process.env.APP_DOMAIN;

const jwtCheck = expressJwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${auth_url}/.well-known/jwks.json`,
  }),
  audience: process.env.APP_AUDIENCE,
  issuer: `https://${auth_url}/`,
  algorithms: ['RS256'],
});

module.exports = jwtCheck;
