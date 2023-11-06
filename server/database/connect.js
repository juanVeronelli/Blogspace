import mysql from 'mysql2';

//dotenv config
import dotenv from 'dotenv';
dotenv.config();

const password = process.env.DB_PASSWORD;

async function connectToDatabase() {
  // Configura los detalles de conexión a la base de datos
  const connection = mysql.createConnection({
    host: 'localhost',    // Cambia esto si tu base de datos no se encuentra en localhost
    user: 'root',         // Usuario de la base de datos
    password,             // Contraseña que se pasa como parámetro
    database: 'users', // Nombre de la base de datos a la que deseas conectarte
  });

  // Conecta a la base de datos
  connection.connect((err) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err);
      return;
    }
  });

  // Devuelve la conexión para que puedas utilizarla
  return connection;
}

export default connectToDatabase
