import User from '../models/User.mjs';
import Role from '../models/Role.mjs';
import Booking from '../models/Booking.mjs';

export const createUser  = async (req, res) => {
    try {
        const { roleId, lastName, firstName, middleName, email, phone, password } = req.body;

        if (!lastName.trim() || !firstName.trim() || !email.trim() || !password.trim() || !roleId) {
            return res.status(400).json({ message: 'Все поля должны быть заполнены' });
        }
       const namePattern = /^[а-яА-ЯёЁ]+$/;
       if (!namePattern.test(lastName) || !namePattern.test(firstName) || (middleName && !namePattern.test(middleName.trim()))) {
           return res.status(400).json({ message: 'Имя, фамилия и отчество должны содержать только кириллицу' });
       }


        if (!/\S+@\S+\.\S+/.test(email)) {
            return res.status(400).json({ message: 'Некорректный формат почты' });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: 'Пароль должен содержать минимум 8 символов' });
        }
        if (!/[A-Z]/.test(password)) {
            return res.status(400).json({ message: 'Пароль должен содержать хотя бы одну заглавную букву' });
        }
        if (!/[a-z]/.test(password)) {
            return res.status(400).json({ message: 'Пароль должен содержать хотя бы одну строчную букву' });
        }
        if (!/[0-9]/.test(password)) {
            return res.status(400).json({ message: 'Пароль должен содержать хотя бы одну цифру' });
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return res.status(400).json({ message: 'Пароль должен содержать хотя бы один специальный символ' });
        }

        const role = await Role.findById(roleId);
        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }

        const newUser  = new User({ lastName, firstName, middleName, email, phone, password, role: roleId });
        await newUser .save();

        res.status(201).json(newUser );
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().populate('role');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

export const getUser  = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('role');
        if (!user) {
            return res.status(404).json({ message: 'User  not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
};

export const updateUser  = async (req, res) => {
    try {
        const updatedUser  = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser ) {
            return res.status(404).json({ message: 'User  not found' });
        }
        res.status(200).json(updatedUser );
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
};

export const deleteUser  = async (req, res) => {
    try {
        const { id } = req.params;

        await Booking.deleteMany({ user: id });

        const deletedUser  = await User.findByIdAndDelete(id);
        if (!deletedUser ) {
            return res.status(404).json({ message: 'User  not found' });
        }

        res.status(200).json({ message: 'User  and associated bookings deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};
