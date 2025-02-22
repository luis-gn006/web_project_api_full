module.exports = class NotFoundError extends Error {
  constructor(message = 'Usuario o tarjeta no encontrados.') {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
};
