//importaciones
const bcrypt = require(`bcrypt`);
const jwt = require(`jsonwebtoken`);
const { generateError } = require(`../helpfun`);
const { createUser, getUserById, getUserByEmail } = require(`../db/encrypter`);
const Joi = require(`joi`);
const { eventSchemaregistrer } = require("../middlewares/schema");
//const { createPoolCluster } = require("mysql2"); //comprobar

//const eventSchemaregistrer = Joi.object().keys({
//  email: Joi.string().email().required().max(100),
//  password: Joi.string().required().min(3).max(100).alphanum(),
//});

//*esquema de validacion de datos de registro y login
//const eventSchemaregistrer = Joi.object().keys({
//  email: Joi.string().email().required(),
//  password: Joi.string().required(),
//});

const newUserCoontroller = async (req, res, next) => {
  // try {
  //   const { email, password } = req.body;

  //    if (!email || !password) {
  //      throw generateError(`Debes enviar un email y un password`, 400);
  //    }

  //*email y password gestionar con join
  // await eventSchemaregistrer.validateAsync(req.body);
  //*gestionar el error con generateError

  //    const id = await createUser(email, password);

  //    res.send({
  //      status: `ok`,
  //      message: `Nuevo usuario creado con id: ${id}`,
  //    });
  //  } catch (error) {
  //    next(error);
  //  }
  //};
  try {
    const { email, password } = req.body;

    //*email y password gestionar con join
    await eventSchemaregistrer.validateAsync(req.body);
    //*gestionar el error con generateError

    const id = await createUser(email, password);

    res.send({
      status: "ok",
      message: "Nuevo usuario creado",
    });
  } catch (error) {
    next(error);
  }
};

//peticion de user 1id
const getUserController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);

    res.send({
      status: `ok`,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const loginUserController = async (req, res, next) => {
  //  try {
  //    const { email, password } = req.body;
  //gestionar con joi
  //*email y password gestionar con join
  //await eventSchemaregistrer.validateAsync(req.body);

  //    if (!email || !password) {
  //      throw generateError(`Debes enviar un email y una password`, 400);
  //    }

  //Recoge los datos del usuario con ese mail de la db
  //    const userEmail = await getUserByEmail(email);
  // console.log(user);

  //Compruebo que las contraseñas coinciden
  //    const validpass = await bcrypt.compare(password, userEmail.password);

  //    if (!validpass) {
  //      throw generateError("La contraseña no coincide o email no válido", 401);
  //    }

  //Creo el payload del token
  //    const payload = { id: userEmail.id };

  // Firmo el token
  //    const token = jwt.sign(payload, process.env.SECRET, {
  //      expiresIn: "30d",
  //   });

  //Envío el token

  //   res.send({
  //     status: `ok`,
  //     data: token,
  //     message: `Usuario logeado`,
  //    });
  //  } catch (error) {
  //    next(error);
  //  }
  //};
  try {
    const { email, password } = req.body;

    //*email y password gestionar con join
    await eventSchemaregistrer.validateAsync(req.body);

    //*recojer los datos de usuario con email
    const userEmail = await getUserByEmail(email);
    //*Compruebo que las contraseñas con correctas
    const validpass = await bcrypt.compare(password, userEmail.password);
    if (!validpass) {
      throw generateError(
        "El email y o password no coinciden o no valido",
        401
      );
    }
    //*creo el payload de token
    const payload = { id: userEmail.id };
    //*frimo el token
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "30d" });
    //*envio el token

    res.send({
      status: "ok",
      message: "Usuario logueado",
      data: token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  newUserCoontroller,
  getUserController,
  loginUserController,
};
