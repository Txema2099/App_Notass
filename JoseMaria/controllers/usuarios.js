const bcrypt = require(`bcrypt`);
const jwt = require(`jsonwebtoken`);
const { generateError } = require(`../helpers`);
const { creaUsuario, getUserById, getUserByEmail } = require(`../db/users`);

const newUserCoontroller = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //Sustituir por joi
    if (!email || !password) {
      throw generateError(`Debes enviar un email y un password`, 400);
    }

    const id = await creaUsuario(email, password);

    res.send({
      status: `ok`,
      message: `Usuario creado con id: ${id}`,
    });
  } catch (error) {
    next(error);
  }
};

const getUserController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = getUserById(id);

    res.send({
      status: `ok`,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
//valdiar con joi
const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw generateError(`Debes enviar un email y una password`, 400);
    }

    //Recoge los datos del usuario con ese amil de la db
    const user = await getUserByEmail(email);
    console.log(user);

    //Compruebo que las contraseñas coinciden
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw generateError('La contraseña no coincide', 401);
    }

    //Creo el payload del token
    const payload = { id: user.id };

    // Firmo el token
    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: '30d',
    });

    //Envío el token

    res.send({
      status: `ok`,
      message: token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  newUserCoontroller,
  getUserController,
  loginController,
};
