import Auth from "../models/Auth.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signup = async (req,res) => {
    const {username, password} = req.body;
    try{
        const hashedPass = await bcrypt.hash(password,12);
        const newUser = await Auth.create({username,password: hashedPass});
        const token = jwt.sign({email: newUser.username},process.env.JWT_SECRET,{expiresIn:'1h'});
        res.status(200).send({newUser,token});
    }
    catch(error){
        console.log(error);
    }
};

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


export const login = async (req, res) => {
    const {username, password} = req.body;
    try{
        Auth.findOne({username: username}).then(user => {
            bcrypt.compare(password,user.password,(err,data) => {
                if(data){
                    const token = jwt.sign({email: username, id: user._id},process.env.JWT_SECRET,{expiresIn:'1h'});
                    res.json({...user._doc,token,exists:true});
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