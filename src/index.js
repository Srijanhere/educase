import express from "express";
import schoolRoutes from "./routes/school.js";
import { initDB } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

await initDB();

// Routes
app.use("/api/schools", schoolRoutes);

// entry point
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
