//*importaciones
const bcrypt = require('bcrypt');
const { generateError } = require('../helpfun');
const { getNotesByUserId } = require('../db/Gnotes');
const { createUser, getUserById, getUserByEmail } = require('../db/Guser');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { eventSchemaregistrer } = require('../db/schema');

//*Peticion de nuevo user
const NewUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //*email y password gestionar con join
    await eventSchemaregistrer.validateAsync(req.body);
    //*gestionar el error con generateError

    const id = await createUser(email, password);

    res.send({
      status: 'ok',
      message: 'Nuevo usuario creado',
    });
  } catch (error) {
    next(error);
  }
};
//*Peticion de datos de usuario
const getMeController = async (req, res, next) => {
  try {
    const user = await getUserById(req.userId, false);

    res.send({
      status: 'ok',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
//*peticion de user 1id
const getUserController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userid = await getUserById(id);

    res.send({
      status: 'ok',
      data: userid,
    });
  } catch (error) {
    next(error);
  }
};
//*Peticion de llas Notas de usuario
const getUserNotesController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await getNotesByUserId(id);

    res.send({
      status: 'ok',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
//*peticion gestion de login
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
        'El email y o password no coinciden o no valido',
        401
      );
    }
    //*creo el payload de token
    const payload = { id: userEmail.id };
    //*frimo el token
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '30d' });
    //*envio el token

    res.send({
      status: 'ok',
      message: 'Usuario logueado',
      data: token,
    });
  } catch (error) {
    next(error);
  }
};

//*exportaciones
module.exports = {
  NewUserController,
  getUserController,
  loginUserController,
  getMeController,
  getUserNotesController,
};
