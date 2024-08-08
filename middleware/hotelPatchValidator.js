import { appError } from "../utils/appError.js";

let hotelValidator = (req,res,next) =>{
    let data = req.body;
    req.body = {};

    if("name" in data &&(typeof data.name != 'string' || data.name.length<=2)){
        return next(new appError("Invalid hotel name",400,"fail"));
    }
    else {
        req.body.name = data.name;
    }
    
    if("services" in data)
    {
        let services = JSON.parse(data.services);
        data.services = JSON.parse(data.services)
        if(!("wifi" in services) || typeof services.wifi != "boolean" ||
        !("parking" in services) || typeof services.parking != "boolean" ||
        !("Dinner" in services) || typeof services.Dinner != "boolean" ||
        !("swimmingPool" in services) || typeof services.swimmingPool != "boolean"){
            
            return next(new appError("please provide a complete service info"),400,"fail");
        }
        else{
            req.body.services = data.services;
        }

    }


    if(!("service" in data ) && !("name" in data) && !(req.file))
    {
        return next(new appError("no data provided to update"),400,"fail");
    }

    console.log(req.body)
    
    next();
}

export{hotelValidator};