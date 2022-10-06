require('dotenv').config(); //*utilizamos el env y requerimos su configuracion

//*definimos una constante para su utilizacion
const { getConnection } = require('./db');

//*definimos un funcion asincronas para abrir, gestionar,crear y borrar tablas/ y cerrar una conexion a la base de datos desde la cola de conexiones
async function main() {
  let conexiones;
  try {
    conexiones = await getConnection();
    //*Borrado de tablas existentes
    await conexiones.query('DROP TABLE IF EXISTS notes');
    await conexiones.query('DROP TABLE IF EXISTS users');
    //*creacion y resteo de tablas desde 0
    //!crear si da tiempo name, avatar, role, registrocode para verificacion email, recovercode , authupdate.
    await conexiones.query(`
        CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTO_INCREMENT
            name VARCHAR(50),
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
  `);
    //!registercode para linkear sobre codigo y no sobre id
    await conexiones.query(`
        CREATE TABLE notes (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            user_id INTEGER NOT NULL,
            text VARCHAR(300) NOT NULL,
            image VARCHAR(100),
            titulo VARCHAR(80) NOT NULL,
            categoria ENUM('Por Hacer','Ya Hecho', 'Trabajo','Casa') NOT NULL,
            Public BOOLEAN DEFAULT false
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
           
        );
    `);
  } catch (error) {
    //*capturamos un error por si fuera necesario en la conexion por prevision
    console.error(error);
  } finally {
    //*cerramos la conexion y devolvemos el cupo a la cola de conexiones para que otro peticion la utilice
    if (conexiones) conexiones.release();
    process.exit();
  }
}
main().catch((error) => console.error(error));
