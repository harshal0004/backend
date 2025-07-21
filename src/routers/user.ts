import { Router } from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser, loginUser, refreshAccessToken } from '../controllers/User';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.post('/', createUser);
router.get('/', requireAuth, getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/login', loginUser);
router.post('/refresh', refreshAccessToken);

export default router; 