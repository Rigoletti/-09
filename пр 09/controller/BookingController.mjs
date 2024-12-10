import Booking from '../models/Booking.mjs';

export const createBooking = async (req, res) => {
    try {
        const { userId, roomId, bookingDate, checkIn, checkOut } = req.body; 
        const newBooking = new Booking({ 
            user: userId, 
            room: roomId, 
            bookingDate,
            checkIn, 
            checkOut 
        });
        await newBooking.save(); 
        res.status(201).json(newBooking); 
    } catch (error) {
        res.status(500).json({ message: "Error creating booking", error }); 
    }
};

// Добавим другие CRUD операции
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('user room');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error });
    }
};

export const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate('user room');
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching booking', error });
    }
};

export const updateBooking = async (req, res) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(500).json({ message: 'Error updating booking', error });
    }
};

export const deleteBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const deletedBooking = await Booking.findByIdAndDelete(bookingId);

        if (!deletedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting booking', error });
    }
};
