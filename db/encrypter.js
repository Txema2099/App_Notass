const bcrypt = require(`bcrypt`);
const { generateError } = require("../helpfun");
const { getConnection } = require(`./db`);

//Fx gestión info pública usuario por su email
const getUserByEmail = async (email) => {
  let conexiones;

  try {
    conexiones = await getConnection();

    const [result] = await conexiones.query(
      `
      SELECT * FROM users WHERE email = ?
    `,
      [email]
    );

    if (result.length === 0) {
      throw generateError("No hay ningún usuario con ese email", 404);
    }

    return result[0];
  } finally {
    if (conexiones) conexiones.release();
  }
};

//Función que devuelve info pública de un usuairo por su id
const getUserById = async (id) => {
  let conexiones;

  try {
    conexiones = await getConnection();

    const [result] = await conexiones.query(
      `
        SELECT id, email, created_at FROM users WHERE id = ?
      `,
      [id]
    );

    if (result.length === 0) {
      throw generateError("No hay ningún usuario con esa id", 404);
    }

    return result[0];
  } finally {
    if (conexiones) conexiones.release();
  }
};

//Crea un usuario en la base de datos y devuelve su id
const createUser = async (email, password) => {
  let conexiones;

  try {
    conexiones = await getConnection();

    //Comprobar que no existe otro usuario con ese email
    const [user] = await conexiones.query(
      `
SELECT id FROM users WHERE email = ?
`,
      [email]
    );

    if (user.length > 0) {
      throw generateError(`Ya existe un usuario con ese email`, 409);
    }

    //Encriptar la password
    const passwordHash = await bcrypt.hash(password, 8);
    //Crea el usuario
    const [newUser] = await conexiones.query(
      `
    INSERT INTO users (email, password) VALUES (?, ?)
    `,
      [email, passwordHash]
    );
    //Devuelve id
    return newUser.insertId;
  } finally {
    if (conexiones) conexiones.release;
  }
};

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
};
