import {asyncWrapper} from '../middleware/asyncWrapper.js';
import { User } from '../modules/userSchema.js';
import {appError} from '../utils/appError.js';
import bcryptjs from 'bcryptjs';
import {authentication} from '../utils/authentication.js';
import {genrateToken} from '../utils/genrateToken.js';

let register = asyncWrapper(async (req,res,next)=>{

    let {email,password,Admin} = req.body;

    Admin=Admin?true:false;

    let checkOld = await User.findOne({userEmail:email});

    if(checkOld || password.length<8 || password.length>30) return next(new appError("invalid email or password",400,"fail"));
    
    let hashedPassword = bcryptjs.hashSync(password);

    let newUser = new User({
        userEmail:email,
        password:hashedPassword,
        Admin,
    })

    // deal with token
    let payload = {email,id:newUser._id,Admin}
    const accessToken = genrateToken(payload,"ACCESS_TOKEN_SECRET");
    const refreshToken = genrateToken(payload,"REFRESH_TOKEN_SECRET");

    newUser.refreshToken = refreshToken;

    await newUser.save();

    res.cookie("refreshToken",refreshToken,{maxAge:1000 * 60 * 60 *24 * 365 ,httpOnly:true})
    res.cookie("accessToken",accessToken,{maxAge:1000 * 60 * 30})

    res.status(201).json({success: true ,status:"success",message: "user created successflly" ,data:{id:newUser._id,accessToken}})
});

let login = asyncWrapper(async (req,res,next)=>{

    let {email,password} = req.body;

    let oldUser = await User.findOne({userEmail:email});

    if(!oldUser){
        return next(new appError("wrong email or password"),400,"fail");
    }
        await authentication(password,oldUser.password);

    // deal with token
    let payload = {email,id:oldUser._id,Admin:oldUser.Admin};
    const accessToken = genrateToken(payload,"ACCESS_TOKEN_SECRET");
    const refreshToken = genrateToken(payload,"REFRESH_TOKEN_SECRET");
    
    await User.findOneAndUpdate({_id:oldUser._id},{refreshToken:refreshToken})
    
    res.cookie("refreshToken",refreshToken,{maxAge:1000 * 60 * 60 *24 * 365 ,httpOnly:true})
    res.cookie("accessToken",accessToken,{maxAge:1000 * 60 * 30})

    res.status(200).json({ success:true, status:"success", message:"user logged in successfully", data:{id:oldUser._id,accessToken} });
})

let logout = asyncWrapper(async(req,res,next)=>{

    if(!req.cookies?.refreshToken){
        return res.status(204).json({success:true, status:"success", message:"you already logout", data:null})
    }

    const refreshToken = req.cookies.refreshToken;

    let foundUser = await User.findOne({refreshToken})

    if(!foundUser){
        res.clearCookie("refreshToken",{httpOnly:true})
        return res.status(204).json({success:true, status:"success", message:"you already logout", data:null})
    }

    foundUser.refreshToken = null;

    await foundUser.save();

    res.clearCookie("refreshToken",{httpOnly:true})
    res.status(204).json({success:true, status:"success", message:"you logout", data:null})

})

export {register,login,logout};
