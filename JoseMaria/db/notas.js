const { generateError } = require('../helpers');
const { getConnection } = require(`./db`);

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
      throw generateError(`LA nota con ${id} no existe`, 404);
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

const createNota = async (userId, text, image = ``) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
    INSERT INTO notas (user_id, text, image)
    VALUES(?, ?, ?)
    `,
      [userId, text, image]
    );
    return result.insertId;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  createNota,
  getAllNotas,
  getNotaByid,
  deleteNotaBiId,
};
