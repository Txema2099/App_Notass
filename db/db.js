//*constante de la base de datos requeria meditar promesa de mysql
const mysql = require('mysql2/promise');

//*constante de llamada destruturing con lamada a base de datos mediarte .env
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

//*variable de conexiones de cola de conexiones
let pool;

//*funcion de conexiones
const getConnection = async () => {
  if (!pool) {
    pool = mysql.createPool({
      connectionLimit: 25,
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: MYSQL_DATABASE,
      timezone: 'Z',
    });
  }
  return await pool.getConnection();
};
//*exportación del modulo para otro .js
module.exports = {
  getConnection,
};
