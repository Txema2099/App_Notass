const { generateError } = require('../helpfun');
const jwt = require('jsonwebtoken');
const authUser = (req, res, next) => {
  try {
    const { autorization } = req.headers;
    if (!autorization) {
      throw generateError('Falta autorizacion para esta acccion', 401);
    }
    //*comprobacion del token
    let token;
    try {
      token = jwt.verify(autorization, process.env.SECRET);
    } catch {
      throw generateError('Token de autorizacion incorrecto', 401);
    }
    //*metemos las informamcion de la req en el controlador
    req.auth = token;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authUser,
};
