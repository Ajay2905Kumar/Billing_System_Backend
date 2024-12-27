import express from 'express';
import { login, signup, usernameExists } from '../controllers/auth.js';

const authRouter = express.Router();
authRouter.post('/signup',signup);
authRouter.post('/login',login);
authRouter.post('/userExists',usernameExists);

export default authRouter;