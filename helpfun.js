const fs = require("fs/promises");

//Fx gestión errores
const generateError = (message, status) => {
  const error = new Error(message);
  error.httpStatus = status;
  return error;
};
//Path para la imagen
const createPathIfNotExists = async (path) => {
  try {
    await fs.access(path);
  } catch {
    await fs.mkdir(path);
  }
};

module.exports = {
  generateError,
  createPathIfNotExists,
};
