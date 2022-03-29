const mysql = require('mysql2');
const { promisify } = require('util');
require('dotenv').config();

const dbconf = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  };

const pool = mysql.createPool(dbconf);

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error para conectar la base de datos');
        console.error(err);
        return err;
    }

    if (connection)
        connection.release();
    console.log("BD Conexión exitosa");
    return;
})

pool.query = promisify(pool.query);

module.exports = pool;
