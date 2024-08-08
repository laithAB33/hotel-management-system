import {Hotel} from '../modules/hotelSchema.js';
import { assignHotel } from '../utils/assignObject.js';
import { asyncWrapper } from '../middleware/asyncWrapper.js';
import { appError } from '../utils/appError.js';
import {Room} from '../modules/roomsSchema.js';
import { uploadToCloudinary } from '../utils/uploadToCloudinary.js';
import { cloudinary } from '../utils/cloudinary.js';

let createHotel =asyncWrapper( async(req,res,next)=>{

    if(!req.file){
        return next(new appError("Please provide a picture of the hotel",400,"fail"));
    }
    let data
    try{ data = await uploadToCloudinary(req) }
    catch(err){
        return next(new appError(err.message,500,"error"));
    }

    let newHotel = assignHotel(req);

    await newHotel.save();

    

    let hotel = await Hotel.findOneAndUpdate(
                {name:req.body.name} ,
                { picture:{url:data.url,public_id:data.public_id} },
                {new:true});

    res.status(201).json({success: true ,status:"success",message: "hotel created successflly" ,data:{hotel}})

})

let getSingleHotel = asyncWrapper( async(req,res,next)=>{

    let name = req.params.name;

    let hotel = await Hotel.findOne({name});

    if(!hotel){
        const error = new appError("hotel not found",404,"fail");
        return next(error);
    }

    res.status(200).json({success: true ,status:"success",message: "the operation was a success" ,data:{hotel}});
})

let deleteHotel = asyncWrapper( async(req,res,next)=>{

    let name = req.params.name;

    let check = await Hotel.findOneAndDelete({name});

    if(!check){
        const error = new appError("hotel not found",404,"fail");
        return next(error);
     }

     // delete picture
     let picture = check.picture;
     await cloudinary.uploader.destroy(picture.public_id);

     await Room.deleteMany({hotel:name});

     res.status(200).json({success: true ,status:"success",message: "the hotel is deleted" ,data:null});

})

let getAll = asyncWrapper( async(req,res,next)=>{

    let data = await Hotel.find({});

    res.status(200).json({success: true ,status:"success",message: "the operation was a success" ,data})

})

let patchHotel = asyncWrapper( async(req,res,next)=>{

    let data = await Hotel.findOneAndUpdate({name:req.params.name},{...req.body},{new:true});

    if(!data ){
        const error = new appError("hotel not found",404,"fail");
        return next(error);
    }

    let hotel = null;

    if(req.file){
        let oldpicture = data.picture;
        await cloudinary.uploader.destroy(oldpicture.public_id);

        let picture = await uploadToCloudinary(req);

        hotel = await Hotel.findOneAndUpdate(
            {name:req.body.name} ,
            { picture:{url:picture.url,public_id:picture.public_id} },
            {new:true});
    }

    hotel = hotel?hotel:data;

    res.status(200).json({success: true ,status:"success",message: "the operation was a success" ,data:{updatedHotel:hotel}})
})

export {createHotel ,getSingleHotel ,deleteHotel ,getAll ,patchHotel };

