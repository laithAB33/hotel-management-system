import {Hotel} from '../modules/hotelSchema.js';
import {Room} from '../modules/roomsSchema.js';

function assignHotel(req) {

    req.body.services = JSON.parse(req.body.services);

    let newHotel = new Hotel({
        name: req.body.name,
        country: req.body.country || null,
        area: req.body.area,
        services:{
            wifi: req.body.services.wifi,
            parking: req.body.services.parking,
            Dinner: req.body.services.Dinner,
            swimmingPool: req.body.services.swimmingPool,
        },
        description: req.body.description || null,
    })

    return newHotel;
    
}

function assignRoom(req){

    let newRoom = new Room({
        hotel: req.body.hotel,
        vip : req.body.vip,
        reservationEnd: new Date(),
        size:{
            length: req.body.size.length,
            width:req.body.size.width,
        },
        beds: req.body.beds,
        price:req.body.price,
        description:req.body.description,
    })
    return newRoom;
}


export {assignHotel ,assignRoom};