module.exports = class ApiError extends Error {
  constructor(message = 'Error del servidor.') {
    super(message);
    this.name = 'ServerError';
    this.statusCode = 500;
  }
};
