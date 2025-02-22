const jwt = require('jsonwebtoken');
require("dotenv").config();

const { JWT_SECRET } = process.env;


const handleAuthError = (res) => {
  res
    .status(403)
    .send({ message: 'Error de autorización' });
};

const extractBearerToken = (header) => {
  return header.replace('Bearer ', '');
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET || "dev-secret");
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload; // añadir el payload al objeto Request

  next(); // pasar la solicitud más adelante
};