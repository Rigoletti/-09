import mongoose from 'mongoose';
import User from '../models/User.mjs';

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

roleSchema.pre('remove', async function(next) {
    await User.deleteMany({ role: this._id }); 
    next();
});

const Role = mongoose.model('Role', roleSchema);

export default Role;
