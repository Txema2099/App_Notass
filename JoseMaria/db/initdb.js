require(`dotenv`).config();

//console.log(process.env);

const { getConnection } = require(`./db`);

async function main() {
  //  console.log(`main`);
  let connection;
  try {
    connection = await getConnection();

    console.log('Borrando tablas existentes');
    await connection.query(`DROP TABLE IF EXISTS notas`);
    await connection.query(`DROP TABLE IF EXISTS usuarios`);

    console.log('Creando tablas');

    await connection.query(`
    CREATE TABLE usuarios (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
    await connection.query(`
    CREATE TABLE notas (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    user_id INTEGER NOT NULL,
    text VARCHAR(1000) NOT NULL,
    image VARCHAR(100),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES usuarios(id)
    );
`);
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
}
main();
