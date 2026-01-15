import express from 'express';
import connectDB from './config/config.js';
import dotenv from 'dotenv';
import User from './models/user.js';
import authRoutes from './routes/authRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();

//middleware
app.use(express.json());
app.use(cors({
    origin:["http://localhost:5173"],
    credentials: true,
}))

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});

