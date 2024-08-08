import { appError } from "../utils/appError.js";


let roomPatchValidator = (req,res,next)=>{

    let data = req.body;
    req.body = {};

    if(("vip"in data) && data.vip!=true && data.vip!=false){
        return next(new appError("invalid vip info",400,"fail"));
    }else {
        req.body.vip = data.vip;
    }

    if(("size"in data) && (typeof data.size.length != "number" || typeof data.size.width != "number") ){
        return next(new appError("invalid size info",400,"fail"))
    }else {
        req.body.size = data.size;
    }

    if( ("beds"in data) && typeof data.beds != "number"){
        return next(new appError("invalid bed info",400,"fail"));
    }else{
        req.body.beds = data.beds;
    }

    if( ("description"in data) && (typeof data.description != "string" || data.description.length<10)  ){
        return next(new appError("invalid description",400,"fail"));
    }else{
        req.body.description = data.description;
    }

    if( ("userEmail"in data) && data.userEmail !=null ){
        return next( new appError("invalid data to reset the userEmail",400,"fail"))
    }else{
        req.body.userEmail = data.userEmail;
    }
    
    next();
}


export {roomPatchValidator};


// vip size beds price description