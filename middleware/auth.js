import jwt from 'jsonwebtoken'

export default function authorizeUser(req,res,next){
    try{
        const token = req.header.Authorization.split(' ')[1];
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        req.userId = decode?.id;
        next();
    }
    catch(error){
        console.log(error);
    }
}