//*constante de la llamada a la base de datos
const { getConnection } = require('./db');

//*importaciones
const { generateError } = require('../helpfun');
const bcrypt = require('bcrypt');

//*crea una funcion de llamada de infomacion publica de usuario por email
const getUserByEmail = async (email) => {
  let conexiones;
  try {
    conexiones = await getConnection();
    const [result] = await conexiones.query(
      `
    SELECT * FROM users WHERE email=?`,
      [email]
    );
    if (result.length === 0) {
      throw generateError('No exixte ningun usuario con ese email', 404);
    }
    return result[0];
  } finally {
    if (conexiones) conexiones.release();
  }
};

//*crea una funcion de llamada de infomacion publica de usuario por id
const getUserById = async (id) => {
  let conexiones;
  try {
    conexiones = await getConnection();
    const [result] = await conexiones.query(
      `
    SELECT id, email, created_at FROM users WHERE id=?`,
      [id]
    );
    if (result.length === 0) {
      throw generateError('No exixte ningun usuario con esta id', 404);
    }
    return result[0];
  } finally {
    if (conexiones) conexiones.release();
  }
};

//*crea un usuario en la basa de datos
const createUser = async (email, password) => {
  let conexiones;
  try {
    conexiones = await getConnection();
    //*comprara que no exista usuario con el mismo mail
    const [users] = await conexiones.query(
      `
    SELECT id FROM users WHERE email = ?`,
      [email]
    );
    if (users.length > 0) {
      throw generateError(
        'ya existe un usuario en la base de datos con ese email',
        409
      );
    }
    //*encryctar la password
    const passwordHash = await bcrypt.hash(password, 8);

    //*crear usuario
    const [newUsers] = await conexiones.query(
      `INSERT INTO users (email, password) VALUES(?,?)`,
      [email, passwordHash]
    );
    //*devolver usuario
    return newUsers.insertId;
  } finally {
    if (conexiones) conexiones.release();
  }
};

//*exportaciones
module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
};
