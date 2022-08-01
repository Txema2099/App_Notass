//constante de la llamada a la base de datos
const { getConnection } = require('./db');

//importaciones
const { generateError } = require('./helpfun');
const bcrypt = require('bcrypt');

//crea un usuario en la basa de datos
const createUser = async (email, password) => {
  let conexiones;
  try {
    conexiones = await getConnection();
    //comprara que no exista usuarioa con el mismo mail
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
    //encryctar la password
    const passwordHash = await bcrypt.hash(password, 8);

    //crear usuario
    const [newUsers] = await conexiones.query(
      `INSERT INTO users (email, password) VALUES(?,?)`,
      [email, passwordHash]
    );
    //devolver usuario
    return newUsers.insertId;
  } finally {
    if (conexiones) conexiones.release();
  }
};

//exportaciones
module.exports = {
  createUser,
};
