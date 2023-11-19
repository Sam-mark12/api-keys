import express from 'express';
import router from './routes/user.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
app.use('/user', router);



app.listen(8000, () => {
    console.log("Server is running successfully");
});
