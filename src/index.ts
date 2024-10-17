const express = require("express");
import dotenv from "dotenv";
import { authMiddleware } from "./services/authServices";
import tasksRouter from "./routes/tasksRoutes";
import registerRoutes from "./routes/registerRoutes";

import db from "./db/connection";
const colors = require("colors/safe");

dotenv.config();

const app = express();
app.use(express.json());

// Routes to login and register don't need authentication middleware
app.use("/api", registerRoutes);
// Tasks endpoints need authentication middleware
app.use("/api/tasks", authMiddleware, tasksRouter);

const PORT = process.env.SERVER_PORT || 3001;

(async () => {
  try {
    // Test database connection
    await db.query("SELECT 1");
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
    process.exit(1);
  }
})();
