import express from 'express';
import { logout, register } from '../controller/authController.js';
import { login } from '../controller/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Register route
router.post('/newaccount', register);
// Login route
router.post('/login', login);
router.post('/logout',logout);

router.get("/check", authMiddleware , (req, res)=>{
    res.status(200).json(req.user);
})

export default router;