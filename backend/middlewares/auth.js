const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const MiddlewareError = require('./MiddlewareError');

const AUTHORIZATION = 403;
const BAD_METHOD = 401;

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(req.headers);
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new MiddlewareError('Authorization Required', AUTHORIZATION));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-testing');
  } catch (err) {
    return next(new MiddlewareError('Invalid token', BAD_METHOD));
  }

  req.user = payload;

  next();
};

module.exports = auth;
