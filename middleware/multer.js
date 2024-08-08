import multer from 'multer';
import { appError } from '../utils/appError.js';

const storage = multer.diskStorage({

    filename:function(req,file,cb){

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + `-${req.body.name}-` + uniqueSuffix);

    }
})

function fileFilter (req,file,cb){

    const type = file.mimetype.split('/')[0];

   if(type =="image")
    cb(null,true);
    else 
    cb(new appError("this file is not a valid image",400,"fail"),false);
}

const upload = multer({ storage: storage ,fileFilter:fileFilter})

export {upload};
