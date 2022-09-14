//importaciones
const bcrypt = require(`bcrypt`);
const jwt = require(`jsonwebtoken`);
const { generateError } = require(`../helpfun`);
const { createUser, getUserById, getUserByEmail } = require(`../db/encrypter`);
const Joi = require(`joi`);
const { eventSchemaregistrer } = require("../db/schema");

const newUserCoontroller = async (req, res, next) => {
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
