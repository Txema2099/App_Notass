const bcrypt = require(`bcrypt`);
const { generateError } = require('../helpers');
const { getConnection } = require(`./db`);

const getUserByEmail = async (email) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
      SELECT * FROM usuarios WHERE email = ?
    `,
      [email]
    );

    if (result.length === 0) {
      throw generateError('No hay ningún usuario con ese email', 404);
    }

    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

//Función que devuelve info pública de un usuairo por su id
const getUserById = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
        SELECT id, email, created_at FROM usuarios WHERE id = ?
      `,
      [id]
    );

    if (result.length === 0) {
      throw generateError('No hay ningún usuario con esa id', 404);
    }

    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

//Crea un usuario en la base de datos y devuelve su id
const creaUsuario = async (email, password) => {
  let connection;

  try {
    connection = await getConnection();

    //Comprobar que no existe otro usuario con ese email
    const [user] = await connection.query(
      `
SELECT id FROM usuarios WHERE email = ?
`,
      [email]
    );

    if (user.length > 0) {
      throw generateError(`Ya existe un usuariocon ese email`, 409);
    }

    //Encriptar la password
    const passwordHash = await bcrypt.hash(password, 8);
    //Crea el usuario
    const [newUser] = await connection.query(
      `
    INSERT INTO usuarios (email, password) VALUES (?, ?)
    `,
      [email, passwordHash]
    );
    //Devuelve id
    return newUser.insertId;
  } finally {
    if (connection) connection.release;
  }
};

module.exports = {
  creaUsuario,
  getUserById,
  getUserByEmail,
};
