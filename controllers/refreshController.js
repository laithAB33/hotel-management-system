import {asyncWrapper} from '../middleware/asyncWrapper.js';
import { User } from '../modules/userSchema.js';
import {appError} from '../utils/appError.js';
import {genrateToken} from '../utils/genrateToken.js';
import jwt from "jsonwebtoken";

let refresh = asyncWrapper( async(req,res,next)=>{

    if(!req.cookies?.refreshToken){
        let error = new appError("Unauthorized. Please login to access this resource",401,"fail")
        return next(error);
    }

    let oldRefreshToken = req.cookies.refreshToken;

    let foundUser = await User.findOne({refreshToken:oldRefreshToken})

    if(!foundUser){
        let error = new appError("forbidden",403,"fail");
        return next(error)
    }

    jwt.verify(oldRefreshToken,process.env.REFRESH_TOKEN_SECRET,
        (err,decoded)=>{
        
            if(err || decoded.id !=foundUser._id){
                let error = new appError("forbidden",403,"fail");
                console.log(111111111111);
                return next(error)
            }

            req.userID = decoded.id;

    })

    let payload = {email:foundUser.userEmail,id:foundUser._id,Admin:foundUser.Admin}

    const accessToken = genrateToken(payload,"ACCESS_TOKEN_SECRET");
    const refreshToken = genrateToken(payload,"REFRESH_TOKEN_SECRET");

    await User.findOneAndUpdate({refreshToken:oldRefreshToken},{refreshToken},{new:true})


    res.cookie("refreshToken",refreshToken,{maxAge:1000 * 60 * 60 *24 * 365 ,httpOnly:true})
    res.cookie("accessToken",accessToken,{maxAge:1000 * 60 * 30})

    

    res.status(200).json({success:true,status:"success",message:"the session is updated successfully",data:{accessToken}})

})

export{refresh};