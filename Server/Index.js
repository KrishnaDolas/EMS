import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRouter from './Routes/Auth.js'; // Corrected path
import departmentRouter from './Routes/department.js';
import EmployeeRouter from './Routes/employee.js';
import connectToDatabase from './db/db.js';

import dotenv from 'dotenv'; // Import dotenv
dotenv.config(); // Load environment variables

connectToDatabase();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('Public/Uploads'))

// Mount the auth routes under /api/auth
app.use('/api/auth', authRouter);
app.use('/api/department', departmentRouter);
app.use('/api/employee', EmployeeRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});