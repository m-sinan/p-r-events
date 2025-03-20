import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import staffRoutes from "./routes/Staff.Route.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";

const app = express();

dotenv.config();

app.use(express.json());

app.use(cors());

app.use('/uploads', express.static('uploads')); // Serve uploaded images

const PORT = process.env.PORT || 8000;

app.use("/api/staffs", staffRoutes)

app.use('/api/attendance', attendanceRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("server started at http://localhost:"+PORT);
});
