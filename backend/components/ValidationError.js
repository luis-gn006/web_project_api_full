module.exports = class ValidationError extends Error {
  constructor(message = 'Los datos proporcionados son inválidos.') {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
  }
};
