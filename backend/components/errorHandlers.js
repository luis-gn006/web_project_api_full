class ApiError extends Error {
  constructor({ message = 'Error del servidor.', name = 'ApiError', statusCode = 500 }) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
  };
};

const validationError = new ApiError({
  message: 'Los datos proporcionados son inválidos.',
  name: 'ValidationError',
  statusCode: 400
});

const notFoundError = new ApiError({
  message: 'Usuario o tarjeta no encontrados.',
  name: 'NotFoundError',
  statusCode: 404
});

const serverError = new ApiError({
  message: 'Error del servidor.',
  name: 'ServerError',
  statusCode: 500
});

module.exports = {
  validationError,
  notFoundError,
  serverError
};