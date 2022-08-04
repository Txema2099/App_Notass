//*Gestion de funcion para perticion de las notas
//*importaciones
const { getConnection } = require('./db');
const { generateError } = require('../helpfun');

//*funcion async gestion de eliminar nota
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
//*funcion gestion async para buscar nota por id
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
      throw generateError(`LA nota con no existe`, 404);
    }

    return result[0];
  } finally {
    if (connection) connection.release();
  }
};
//*funcion gestion async para todas las notas usuario , publicada o no
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
const createNote = async (userId, text, image = '') => {
  let conexiones;
  try {
    conexiones = await getConnection();
    const { result } = await conexiones.query(
      `
    INSET INTO notes (user_id, text, image),
    VALUES(?,?,?)
    `,
      [userId, text, image]
    );

    return result.insertId;
  } finally {
    if (conexiones) conexiones.release();
  }
};
//!modificar createnote para incluir titulo y categorias
//!crear una funcion de modificar notes para modificacion de notas por id usuario tokenizado
//*exportaciones
module.exports = {
  createNote,
  getAllNotas,
  getNotaByid,
  deleteNotaBiId,
};
