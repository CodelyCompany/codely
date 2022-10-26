const { expressjwt: expressJwt } = require('express-jwt');
const jwks = require('jwks-rsa');

require('dotenv').config();

const jwtCheck = expressJwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: process.env.APP_JWKS_URI,
    }),
    audience: process.env.APP_AUDIENCE,
    issuer: process.env.APP_ISSUER,
    algorithms: ['RS256'],
});

module.exports = jwtCheck;
