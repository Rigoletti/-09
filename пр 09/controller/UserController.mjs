import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User.mjs';
import Role from '../models/Role.mjs';
import Booking from '../models/Booking.mjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();

mongoose.connect(process.env.MongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const JWT_SECRET = process.env.JWT_SECRET || '243';

const validateInput = (req, res) => {
    const { lastName, firstName, middleName, email, phone, password, roleId } = req.body;

    if (!lastName || !firstName || !email || !password || !roleId) {
        return res.status(400).json({ message: 'Все поля должны быть заполнены' });
    }

    const namePattern = /^[а-яА-ЯёЁ]+$/;
    if (!namePattern.test(lastName) || !namePattern.test(firstName) || (middleName && !namePattern.test(middleName.trim()))) {
        return res.status(400).json({ message: 'Имя, фамилия и отчество должны содержать только кириллицу' });
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({ message: 'Некорректный формат почты' });
    }

    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    if (!passwordPattern.test(password)) {
        return res.status(400).json({ message: 'Пароль должен содержать минимум 8 символов, одну заглавную букву, одну строчную букву, одну цифру и один специальный символ' });
    }

    return true;
};

const handleError = (res, error) => {
    console.error(error);
    res.status(500).json({ message: 'Ошибка', error: error.message });
};

export const createUser  = async (req, res) => {
    try {
        if (!validateInput(req, res)) {
            return;
        }

        const { roleId, lastName, firstName, middleName, email, phone, password } = req.body;

        const role = await Role.findById(roleId);
        if (!role) {
            return res.status(404).json({ message: 'Роль не найдена' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser  = new User({ lastName, firstName, middleName, email, phone, password: hashedPassword, role: roleId });
        await newUser .save();

        const token = jwt.sign({ id: newUser ._id, role: roleId }, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ user: newUser , token });
    } catch (error) {
        handleError(res, error);
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().populate('role');
        res.status(200).json(users);
    } catch (error) {
        handleError(res, error);
    }
};

export const getUser  = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('role');
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }
        res.status(200).json(user);
    } catch (error) {
        handleError(res, error);
    }
};

export const updateUser  = async (req, res) => {
    try {
        const updatedUser  = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser ) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }
        res.status(200).json(updatedUser );
    } catch (error) {
        handleError(res, error);
    }
};

export const deleteUser  = async (req, res) => {
    try {
        const { id } = req.params;

        await Booking.deleteMany({ user: id });

        const deletedUser  = await User.findByIdAndDelete(id);
        if (!deletedUser ) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        res.status(200).json({ message: 'Пользователь и связанные бронирования успешно удалены' });
    } catch (error) {
        handleError(res, error);
    }
};
