const fs = require('fs/promises');
//*funcion de gestion de error simplificada
const generateError = (message, status) => {
  const error = new Error(message);
  error.httpStatus = status;
  return error;
};

//*Path para la imagen
const createPathIfNotExists = async (path) => {
  try {
    await fs.access(path);
  } catch {
    await fs.mkdir(path);
  }
};
//*exportaciones
module.exports = {
  generateError,
  createPathIfNotExists,
};
