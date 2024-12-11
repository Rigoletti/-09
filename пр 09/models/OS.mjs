import mongoose from 'mongoose';

const OSSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
});


const OS = mongoose.model('OS', OSSchema);

export default OS;
