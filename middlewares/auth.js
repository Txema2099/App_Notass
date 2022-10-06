//*importacion de gestion de errores
const { generateError } = require('../helpfun');
//*importacion de gestion token authorization
const jwt = require('jsonwebtoken');

const authUser = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw generateError('Falta autorizacion para esta acccion', 401);
    }
    //*comprobacion del token
    let token;
    try {
      token = jwt.verify(authorization, process.env.SECRET);
    } catch {
      throw generateError('Token de autorizacion incorrecto', 401);
    }
    //*metemos las informamcion de la req en el controlador
    req.userId = token.id;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authUser,
};
