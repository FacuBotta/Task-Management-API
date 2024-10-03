import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

// Crea un pool de conexiones
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // Límite de conexiones simultáneas
  queueLimit: 0, // No limitar la cola
});

export default db;
