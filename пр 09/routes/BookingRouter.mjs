import express from 'express';
import { createBooking, getAllBookings, getBookingById, updateBooking, deleteBooking } from '../controller/BookingController.mjs';

const router = express.Router();

router.post('/', createBooking);
router.get('/', getAllBookings);
router.get('/:id', getBookingById);
router.put('/:id', updateBooking);
router.delete('/:id', deleteBooking);

export default router;
