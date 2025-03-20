import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
  staff_Id: { type: String, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, default: "Present" },
});

const Attendance = mongoose.model("Attendance", AttendanceSchema);

export default Attendance;
