//importaciones
const { generateError } = require('./helpfun');
const { createUser } = require('./db/encrycter');

const NewUserController = async (req, res, next) => {
  try {
    //email y password gestionar con join
    //gestionar el error con generateError

    const id = await createUser(email, password);

    res.send({
      status: 'error',
      message: 'Not implementado',
    });
  } catch (error) {
    next(error);
  }
};
const getUserController = async (req, res, next) => {
  try {
    res.send({
      status: 'error',
      message: 'Not implementado',
    });
  } catch (error) {
    next(error);
  }
};
const loginUserController = async (req, res, next) => {
  try {
    res.send({
      status: 'error',
      message: 'Not implementado',
    });
  } catch (error) {
    next(error);
  }
};
//exportaciones
module.exports = {
  NewUserController,
  getUserController,
  loginUserController,
};
