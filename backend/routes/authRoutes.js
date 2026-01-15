import express from 'express';
import { register } from '../controller/authController.js';
import { login } from '../controller/authController.js';

const router = express.Router();

// Register route
router.post('/newaccount', register);
// Login route
router.post('/login', login);

export default router;