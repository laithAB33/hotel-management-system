import { cloudinary } from "./cloudinary.js";

async function uploadToCloudinary(req){

    let imageIfo = await cloudinary.uploader.upload(req.file.path);
    
    return imageIfo;
        
}

export {uploadToCloudinary};