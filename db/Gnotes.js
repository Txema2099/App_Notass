//*Gestion de funcion para perticion de las notas
//*importaciones
const { getConnection } = require('./db');
const { generateError } = require('../helpfun');

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
};
