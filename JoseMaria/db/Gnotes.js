//Fx para gestionar la petición de notas
const { generateError } = require("../helpfun");
const { getConnection } = require(`./db`);
//Fx eliminación notas
const deleteNotaBiId = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    await connection.query(
      `
      DELETE FROM notas WHERE id = ?
    `,
      [id]
    );

    return;
  } finally {
    if (connection) connection.release();
  }
};
//Fx asíncrona para la búsqueda de nota por id
const getNotaByid = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
      SELECT * FROM notas WHERE id = ?
    `,
      [id]
    );
    if (result.lenght === 0) {
      throw generateError(`La nota con ${id} no existe`, 404);
    }

    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

const getAllNotas = async () => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(`
      SELECT * FROM notas ORDER BY created_at DESC
    `);

    return result;
  } finally {
    if (connection) connection.release();
  }
};

const createNote = async (userId, text, image = ``) => {
  let conexiones;

  try {
    conexiones = await getConnection();

    const [result] = await conexiones.query(
      `
    INSERT INTO notes (user_id, text, image)
    VALUES(?, ?, ?)
    `,
      [userId, text, image]
    );
    return result.insertId;
  } finally {
    if (conexiones) conexiones.release();
  }
};

module.exports = {
  createNote,
  getAllNotas,
  getNotaByid,
  deleteNotaBiId,
};
