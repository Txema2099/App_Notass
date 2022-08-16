//Fx para gestionar la petición de notas
const { generateError } = require("../helpfun");
const { getConnection } = require(`./db`);
//Fx eliminación notas
const deleteNotaBiId = async (id) => {
  let connection;

  try {
    // await getConnection();
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
//Fx asíncrona para la búsqueda de nota por id
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
      SELECT * FROM notes ORDER BY created_at DESC
    `);

    return result;
  } finally {
    if (connection) connection.release();
  }
};

const createNote = async (userId, text, image = ``, categoria, titulo) => {
  let conexiones;

  try {
    conexiones = await getConnection();

    const [result] = await conexiones.query(
      `
    INSERT INTO notes (user_id, text, image, categoria, titulo)
    VALUES(?, ?, ?, ?, ?)
    `,
      [userId, text, image, categoria, titulo]
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
  image = "",
  categoria,
  titulo,
  active
) => {
  let conexiones;
  try {
    conexiones = await getConnection();
    const [result] = await conexiones.query(
      ` 
      UPDATE notes
      SET text='${text}', image='${image}', categoria='${categoria}', active= ${active}, titulo='${titulo}' 
      WHERE id='${id}'
    `,
      [id, userId, text, image, categoria, titulo, active]
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
  ModifyNote,
};
