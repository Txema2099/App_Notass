const jwt = require("jsonwebtoken");
const { generateError } = require("../helpfun");

const authUser = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw generateError("Falta la cabecera de Authorization", 401);
    }

    // Comprobamos que el token sea correcto
    let token;

    try {
      token = jwt.verify(authorization, process.env.SECRET);
    } catch {
      throw generateError("Token incorrecto", 401);
    }
    //   console.log(token);

    // Metemos la información del token en la request para usarla en el controlador
    req.userId = token.id;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authUser,
};
