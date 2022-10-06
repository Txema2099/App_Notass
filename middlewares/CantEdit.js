const { getConnection } = require('../db/db');
//! hace llamada de notas pero no filtra por user
const CantEdit = async (req, res, next) => {
  let conexiones;

  try {
    conexiones = await getConnection();
    const { id } = req.params;
    const [current] = await conexiones.query(
      `
        SELECT user_id
        FROM notes
        WHERE id=?
        `,
      [id]
    );
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  CantEdit,
};
