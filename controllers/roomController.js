import { asyncWrapper } from "../middleware/asyncWrapper.js";
import { Hotel } from "../modules/hotelSchema.js";
import { Room } from "../modules/roomsSchema.js";
import { appError } from "../utils/appError.js";
import { assignRoom } from "../utils/assignObject.js";

let getFreeRooms = asyncWrapper( async(req,res,next)=>{

    await Room.updateMany(
        {$or:[
            {userEmail:null},
            {reservationEnd:{ $lt:Date.now() }}
        ]},
        {userEmail:null,reservationEnd:Date.now()}
        );

        let freeRooms = await Room.find({userEmail:null})

    if(!freeRooms.length){
        let error = new appError("Rooms not found",404,"fail");
        return next(error);
    }

    res.status(200).json({success: true ,status:"success",message: "free rooms exist" ,data:{freeRooms}})
})

let bookAroom = asyncWrapper( async(req,res,next)=>{

    let hotel = req.body.hotel, userEmail = req.userEmail;
    let vip = req.body.vip, reservationEnd= req.body.reservationEnd;

    let way = req.body.way;

    if(way == "id")
    {
        let chooseRoom = await Room.findOneAndUpdate(
            { $or:[ {userEmail:null,_id:req.body.id} ,{reservationEnd:{ $lt: new Date() },_id:req.body.id} ] }
            , {userEmail,reservationEnd}, {new: true}
        )

        if(!chooseRoom){
            let error = new appError("Room not found",404,"fail");
            return next(error)
        }
       
        return res.status(200).json({success: true ,status:"success",message: "room booked successfully" ,data:{chooseRoom}})
        
    }
    
    else if(way == "free")
    {

        let freeRoom = await Room.findOneAndUpdate(
            { $or:[ {userEmail:null,hotel,vip} ,{reservationEnd:{ $lt: new Date() },hotel,vip} ] }
            , {userEmail,reservationEnd}, {new: true});

        if(!freeRoom){
            let error = new appError("there is no more free rooms",404,"fail");
            return next(error);
        }

        res.status(200).json({success: true ,status:"success",message: "room booked successfully" ,data:{freeRoom}})
    }

})

let createNewRoom = asyncWrapper( async(req,res,next)=>{

    let oldHotel = await Hotel.findOne({name:req.body.hotel});

    if(!oldHotel){
        const error = new appError("hotel not found",404,"fail");
        return next(error);
    }
    let newRoom = assignRoom(req);

    await newRoom.save();

    res.status(201).json({success: true ,status:"success",message:"Room successfully created" ,data:{newRoom}})

})

let getAllRoom = asyncWrapper( async(req,res,next)=>{

    let rooms = await Room.find({hotel:req.params.hotel});

    res.status(200).json({success:true ,status:"success",message:"the operation was successful",data:{rooms}});
})

let deleteRoom = asyncWrapper( async(req,res,next)=>{

    let check = await Room.findOneAndDelete({_id:req.params.id});

    if(!check){
        const error = new appError("room not found",404,"fail");
        return next(error);
    }

    res.status(200).json({success: true ,status:"success",message: "the room is deleted" ,data:null});

})

let patchRoom = asyncWrapper( async(req, res , next) => {

    let patchedRoom = await Room.findOneAndUpdate({_id:req.params.id},{...req.body},{new:true})

    if(!patchedRoom){
        const error = new appError("room not found",404,"fail");
        return next(error);
    }

    res.status(200).json({success: true ,status:"success",message: "the room is patched" ,data:patchedRoom});

})

export {getFreeRooms ,bookAroom , createNewRoom, getAllRoom ,deleteRoom, patchRoom };