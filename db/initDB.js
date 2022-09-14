require(`dotenv`).config();

//console.log(process.env);

const { getConnection } = require(`./db`);
//fx asincrona gestión db y pool conexiones.
async function main() {
  //  console.log(`main`);
  let conexiones;
  try {
    conexiones = await getConnection();

    console.log("Borrando tablas existentes");
    await conexiones.query(`DROP TABLE IF EXISTS notes`);
    await conexiones.query(`DROP TABLE IF EXISTS users`);

    console.log("Creando tablas");

    await conexiones.query(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

    await conexiones.query(`
    CREATE TABLE notes (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      user_id INTEGER NOT NULL,
      text VARCHAR(300) NOT NULL,
      image VARCHAR(100),
      categoria VARCHAR (50),
      titulo VARCHAR (80),
      Public BOOLEAN DEFAULT false, 
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
      );
  `);

    //boleano para publicación y nota
  } catch (error) {
    console.error(error);
  } finally {
    if (conexiones) conexiones.release();
    process.exit();
  }
}
main();
