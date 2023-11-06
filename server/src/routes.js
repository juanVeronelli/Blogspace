import express from 'express';
const router = express.Router();
import upload from '../middlewares/multer.js';

//utilietes
import { authenticate } from '../utils/auth.js';

//controllers
import user from '../controllers/users.js'
//Login user route
router.post('/login', user.login);
//register user route
router.post('/register', user.register);
//verify token
router.get('/auth', user.verificate);
//get profiles
router.get('/profile/:username', authenticate, user.getProfiles);

export default router