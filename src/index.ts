const express = require("express");
import dotenv from "dotenv";

import tasksRouter from "./routes/tasksRoutes";
import db from "./db/connection";
const colors = require("colors/safe");

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/tasks", tasksRouter);

const PORT = process.env.SERVER_PORT || 3001;

// Verifica la conexión a la base de datos antes de levantar el servidor
(async () => {
  try {
    await db.query("SELECT 1"); // Realiza una consulta para probar la conexión
    console.log(colors.rainbow("================================="));
    console.log(colors.gray("Database connected successfully! 👌"));
    app.listen(PORT, () => {
      console.log(colors.brightCyan(`Server is running on port ${PORT} 🔥`));
      console.log(
        colors.brightGreen(`Go to http://localhost:${PORT}/api/tasks 🚀`)
      );
    });
  } catch (error) {
    console.error(colors.red("⚠️ Failed to connect to the database:", error));
    process.exit(1); // Salir si no se puede conectar
  }
})();
