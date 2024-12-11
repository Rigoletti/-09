import express from 'express';
import { createOS, getAllOS, getOSById, updateOS, deleteOS } from '../controller/OSController.mjs';

const router = express.Router();

router.post('/', createOS);
router.get('/', getAllOS);
router.get('/:id', getOSById);
router.put('/:id', updateOS);
router.delete('/:id', deleteOS);

export default router;
