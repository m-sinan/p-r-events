import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import staffRoutes from "./routes/Staff.Route.js";

const app = express();

dotenv.config();

app.use(express.json());

app.use(cors());

const PORT = process.env.PORT || 8000;

app.use("/api/staffs", staffRoutes)

app.listen(PORT, () => {
  connectDB();
  console.log("server started at http://localhost:" + PORT);
});
