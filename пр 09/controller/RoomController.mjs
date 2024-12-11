import Room from '../models/Room.mjs';
export const createRoom = async (req, res) => {
    try {
        const { roomNumber, type, price, description } = req.body;
        const newRoom = new Room({ roomNumber, type, price, description });
        await newRoom.save();
        res.status(201).json(newRoom);
    } catch (error) {
        res.status(500).json({ message: "Error creating room", error });
    }
};

export const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: "Error fetching rooms", error });
    }
};

export const getRoomById = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }
        res.status(200).json(room);
    } catch (error) {
        res.status(500).json({ message: "Error fetching room", error });
    }
};

export const updateRoom = async (req, res) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedRoom) {
            return res.status(404).json({ message: "Room not found" });
        }
        res.status(200).json(updatedRoom);
    } catch (error) {
        res.status(500).json({ message: "Error updating room", error });
    }
};

export const deleteRoom = async (req, res) => {
    try {
        const deletedRoom = await Room.findByIdAndDelete(req.params.id);
        if (!deletedRoom) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.status(200).json({ message: 'Room deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting room', error });
    }
};
