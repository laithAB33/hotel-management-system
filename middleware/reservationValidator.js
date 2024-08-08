import isEmail from 'validator/lib/isEmail.js';
import { isDate } from '../validation/isDate.js';
import {appError} from '../utils/appError.js';

let reservationValidator = (req,res,next)=>{

    let hotel = req.body.hotel, userEmail = req.userEmail ;
    let vip = req.body.vip, reservationEnd= req.body.reservationEnd;
    let id = req.body.id;
    console.log(hotel,userEmail,vip,reservationEnd,id);
    req.body.reservationEnd = new Date(reservationEnd)
    req.body.reservationEnd.setHours(12,0,0,0);

    if(isEmail(userEmail) && isDate(reservationEnd) && id ){

        req.body.way = "id";

        req.body.reservationEnd = new Date(reservationEnd)
        req.body.reservationEnd.setHours(12,0,0,0);

        return next();
    }

    else if(isEmail(userEmail) && (vip==false || vip==true) && typeof(hotel)== "string" && isDate(reservationEnd))
    {

        req.body.reservationEnd = new Date(reservationEnd)
        req.body.reservationEnd.setHours(12,0,0,0);

        req.body.way = "free";
        return next();
    }

    let error = new appError("reservation validation failed",400,"fail");
        return next(error);

}

export {reservationValidator};