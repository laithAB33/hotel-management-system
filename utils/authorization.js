import { appError } from "./appError.js";


let authorization = (req,res,next)=>{

    if(req.Admin) next();

    else {
        let error = new appError("unsuthorized to this route",401,"fail");
        return next(error);
    }
}

export{authorization};