import  Express  from "express";
import { createHotel , getSingleHotel ,deleteHotel ,getAll, patchHotel} from "../controllers/hotelController.js";
import {upload} from "../middleware/multer.js";
import { hotelValidator } from "../middleware/hotelPatchValidator.js";
import {authorization} from "../utils/authorization.js";
import {verifyToken} from "../middleware/verifyToken.js";

const Router = Express.Router();

Router.route('/')
      .post(verifyToken,authorization,upload.single('image'),createHotel)
      .get(getAll)

Router.route('/:name')
      .get(getSingleHotel)
      .delete(verifyToken,authorization,deleteHotel)
      .patch(verifyToken,authorization,upload.single('image'),hotelValidator,patchHotel)


export {Router};


