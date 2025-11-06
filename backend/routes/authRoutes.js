import express from 'express';
import { signup, login, guestLogin } from '../controllers/authController.js';
const router = express.Router();
router.post('/signup', signup);
router.post('/login', login);
router.post('/guest', guestLogin);
export default router;
