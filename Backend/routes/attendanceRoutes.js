import express from 'express';
import { deleteAttendance, getAttendance, submitAttendance } from '../controllers/attendanceController.js';

const router = express.Router();


router.post('/', submitAttendance);
router.get('/:staff_Id', getAttendance);
router.delete('/:id', deleteAttendance);

export default router;