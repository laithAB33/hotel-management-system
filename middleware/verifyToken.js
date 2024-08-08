import jwt from "jsonwebtoken";
import {appError} from '../utils/appError.js';

let verifyToken = (req,res,next)=>{

    let token = req.cookies?.accessToken;
    let decoded;

    try{
        decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    }catch(err){

            let error = new appError(err.message,401,"fail");
            return next(error);
    }
    req.userID = decoded.id;
    req.Admin = decoded.Admin;
    req.userEmail = decoded.email;
    next();

}

export{verifyToken};