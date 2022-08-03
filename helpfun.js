//*funcion de gestion de error simplificada
const generateError = (message, status) => {
  const error = new Error(message);
  error.httpStatus = status;
  return error;
};
//*exportaciones
module.exports = {
  generateError,
};
