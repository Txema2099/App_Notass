//Creo constante requiriendo a MYSQL para gestionar la promesa
const mysql = require("mysql2/promise");
//Destrcuturing process.env
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;
//declaro variable fuera de fx para que esté limitada al scope de una fx
let pool;

const getConnection = async () => {
  if (!pool) {
    pool = mysql.createPool({
      connectionLimit: 10,
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: MYSQL_DATABASE,
      timezone: "Z",
    });
  }

  return await pool.getConnection();
};

module.exports = {
  getConnection,
};
