import Attendance from '../models/Attendance.js';

export const submitAttendance = async (req, res) => {
  const { staff_Id } = req.body;
  try {
    const newAttendance = new Attendance({ staff_Id });
    await newAttendance.save();
    res.status(201).json(newAttendance);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


export const getAttendance = async (req, res) => {
  const { staff_Id } = req.params;
  try {
    const attendance = await Attendance.find({ staff_Id });
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteAttendance = async (req, res) => {
  const { id } = req.params;
  try {
    await Attendance.findByIdAndDelete(id);
    res.json({ message: 'Attendance deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}