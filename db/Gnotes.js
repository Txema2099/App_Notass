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
      DELETE FROM notes WHERE id = ?
    `,
      [id]
    );

    return;
  } finally {
    if (connection) connection.release();
  }
};
//*funcion gestion async para buscar nota por id
//!comparativa de user
const getNotaByid = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
      SELECT * FROM notes WHERE id = ?
    `,
      [id]
    );
    if (result.length == 0) {
      throw generateError(`La nota no existe`, 404);
    }

    return result[0];
  } finally {
    if (connection) connection.release();
  }
};
//*funcion gestion async para todas las notas usuario , publicada o no
//!no limita usuario registrado
const getAllNotas = async () => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(`
      SELECT * FROM notes ORDER BY created_at DESC
    `);

    return result;
  } finally {
    if (connection) connection.release();
  }
};

//*modificar createnote para incluir titulo y categorias
const createNote = async (userId, text, image = ``, Titulo, categoria) => {
  let conexiones;
  try {
    conexiones = await getConnection();

    const [result] = await conexiones.query(
      `
    INSERT INTO notes (user_id, text, image, Titulo, categoria)
    VALUES(?,?,?,?,?)
    `,
      [userId, text, image, Titulo, categoria]
    );

    return result.insertId;
  } finally {
    if (conexiones) conexiones.release();
  }
};
//*crear una funcion de modificar notes para modificacion de notas por id usuario tokenizado
const ModifyNote = async (
  id,
  userId,
  text,
  image = '',
  Titulo,
  categoria,
  Public
) => {
  let conexiones;
  try {
    conexiones = await getConnection();

    const [result] = await conexiones.query(
      `
      UPDATE notes
      SET text=?, Titulo=?, categoria=?, Public=?, image=?
      WHERE id=?

      `,
      [text, Titulo, categoria, Public, image, id]
    );
    return result.InsertId;
  } finally {
    if (conexiones) conexiones.release();
  }
};
//*exportaciones
module.exports = {
  createNote,
  getAllNotas,
  getNotaByid,
  deleteNotaBiId,
  ModifyNote,
};
