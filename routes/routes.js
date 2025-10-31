import express from 'express';
import { changeUserPassword, loginUsers } from '../controllers/users.js';

const router = express.Router();

//

router.post('/login', loginUsers);

router.put('/user/change-password', changeUserPassword);

export default router;