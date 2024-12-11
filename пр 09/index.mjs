import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db_connect.mjs';
import userRouter from './routes/UserRouter.mjs';
import bookingRouter from './routes/BookingRouter.mjs';
import roomRouter from './routes/RoomRouter.mjs';
import roleRouter from './routes/RoleRouter.mjs';
import OSRouter from './routes/OSRouter.mjs';
import { auth } from './middleware/auth.mjs'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5005;

app.use(express.json());

connectDB();


app.use('/api/users', userRouter);
app.use('/api/bookings', bookingRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/roles', roleRouter);
app.use('/api/os', OSRouter);


app.get('/api/users/protected', auth, (req, res) => {
    res.status(200).json({ message: 'Доступ разрешен', user: req.user });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
