const { getConnection } = require("../db/db");

//const CantEdit = async (req, res, next) => {
//  let conexiones;
//  try {
//   conexiones = await getConnection();
//   const [id] = req.params;
//   const [current] = await conexiones.query(
//     `
//       SELECT used_id
//       FROM notes
//       WHERE id=?
//       `,
//    [id]
//   );
//    next();
///  } catch (error) {
//    next(error);
//  }
//};

module.exports = {
  CantEdit,
};
