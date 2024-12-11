import { auth } from '../middleware/auth.js';

router.get('/protected', auth, (req, res) => {
    res.status(200).json({ message: 'Доступ разрешен', user: req.user });
});
