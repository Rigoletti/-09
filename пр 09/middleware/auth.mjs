import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '243';

export const auth = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; 
    console.log('Received token:', token);

    if (!token) {
        console.log('No token provided.');
        return res.status(401).json({ message: 'Нет токена, доступ запрещен' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log('Token verification error:', err.message);
            return res.status(403).json({ message: 'Неверный токен' });
        }
        console.log('Decoded user data:', decoded);
        req.user = decoded; 
        next();
    });
};