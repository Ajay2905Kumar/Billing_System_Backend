import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import Auth from './models/Auth.js';
import bcrypt from 'bcrypt';

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
console.log(mongoose.connection)
app.get('/',(req,res) => {
    res.send('This is the Billing application server');
});

export const signup = async (req,res) => {
    const {username, password} = req.body;
    try{
        const hashedPass = await bcrypt.hash(password,12);
        const newUser = await Auth.create({username,password: hashedPass});
        res.status(200).send(newUser);
    }
    catch(error){
        console.log(error);
    }
}; 
app.post('/signup', signup);

export const usernameExists = async (req,res) => {
    const { username } = req.body;
    try{
        const data = await Auth.findOne({"username": username});
        data ? res.json({exists:true}) : res.json({exists:false});
    }
    catch(error){
        console.log(error);
        res.status(500).json("Something went wrong!!!");
    }
}

app.post('/userExists',usernameExists)

export const login = async (req, res) => {
    const {username, password} = req.body;
    try{
        Auth.findOne({username: username}).then(user => {
            bcrypt.compare(password,user.password,(err,data) => {
                if(data){
                    res.json({...user._doc,exists:true});
                }
                else{
                    res.json({exists: false, msg: "Invalid Credentials"});
                }
            })
        });
    }
    catch(error){
        console.log(error);
    }
}
app.post('/login',login);