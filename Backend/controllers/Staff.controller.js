import mongoose from "mongoose";
import Staffs from "../models/staff_profile.js";

//get all staffs
export const getStaffs = async (req, res) => {
  try {
    const staffs = await Staffs.find();
    res.status(200).json({ success: true, data: staffs });
  } catch (error) {
    console.error("Error in get staffs:", error.message);
    res.status(500).json({ success: false, message: "server Error" });
  }
};

//create a staff
export const createStaff = async (req, res) => {
  const staffs = req.body; //user will send this data

  if (!staffs.name || !staffs.staff_Id || !staffs.age || !staffs.phone_Number) {
    return res
      .status(400)
      .json({ success: false, message: "please provide all fields" });
  }

  // Add the uploaded image path to the staff data
  if (req.file) {
    staffs.profileImage = req.file.path; // Path to the uploaded image
  }

  const newStaff = new Staffs(staffs);

  try {
    await newStaff.save();
    res.status(201).json({ success: true, data: newStaff });
  } catch (error) {
    console.error("Error in create staff:", error.message);
    res.status(500).json({ success: false, message: "server Error" });
  }
};

//delete a staff

export const deleteStaff = async (req, res) => {
  const { id } = req.params;
  console.log("id:", id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid staff id" });
  }

  try {
    await Staffs.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "staff deleted" });
  } catch (error) {
    console.log("error in deleting staff:", error.message);

    res.status(500).json({ success: false, message: "Server error" });
  }
};

//update staff

export const updateStaff = async (req, res) => {
  const { id } = req.params;

  const staff = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid staff id" });
  }

  try {
    const updatedStaff = await Staffs.findByIdAndUpdate(id, staff, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedStaff });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
