import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRouter from './routes/auth.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({
    limit: "30mb",
    extended: true,
}));
app.use(express.urlencoded({
    limit: "30mb",
    extended: true,
}));

const port = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_CONNECTION_URL;

mongoose.connect(DATABASE_URL).then(() => {
    app.listen(port, () => {
        console.log("Server Started and Connected to DB!!!");
    })
}).catch((err) => console.log(err));

app.get('/',(req,res) => {
    res.send('This is the Billing application server');
});

app.use(authRouter);