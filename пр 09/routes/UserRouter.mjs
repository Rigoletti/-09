import express from 'express';
import { auth } from '../middleware/auth.mjs'; 
import { createUser, getAllUsers, getUser, updateUser, deleteUser } from '../controller/UserController.mjs';

const router = express.Router();

router.post('/', createUser); 
router.get('/', auth, getAllUsers);
router.get('/:id', auth, getUser); 
router.put('/:id', auth, updateUser); 
router.delete('/:id', auth, deleteUser); 

export default router;