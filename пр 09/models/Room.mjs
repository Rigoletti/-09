import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    roomNumber: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['single', 'double', 'suite'], 
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

const Room = mongoose.model('Room', roomSchema);

export default Room;
