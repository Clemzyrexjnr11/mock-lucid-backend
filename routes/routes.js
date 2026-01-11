import express from 'express';
import { changeUserPassword, getSupportInformation, loginUsers } from '../controllers/users.js';
import { fetchAuthToken } from '../middlewares/auth-token.js';

const router = express.Router();

//

router.post('/login', loginUsers);
router.put('/user/change-password', fetchAuthToken, changeUserPassword);
router.get('/get-support-information', fetchAuthToken, getSupportInformation);

export default router;