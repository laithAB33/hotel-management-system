import  Express  from "express";
import { getFreeRooms ,bookAroom , createNewRoom , getAllRoom ,deleteRoom ,patchRoom } from "../controllers/roomController.js";
import { reservationValidator } from "../middleware/reservationValidator.js";
import { roomPatchValidator } from "../middleware/roomPatchValidator.js";
import {verifyToken} from "../middleware/verifyToken.js";
import { authorization } from "../utils/authorization.js";
const Router = Express.Router();

Router.route('/free/:hotel').get(getFreeRooms)

Router.route('/:hotel').get(getAllRoom)

Router.route('/:id').delete(verifyToken,authorization,deleteRoom)
                    .patch(verifyToken,authorization,roomPatchValidator,patchRoom)
 
Router.route('/').patch(verifyToken,reservationValidator,bookAroom)
                 .post(verifyToken,authorization,createNewRoom)

export {Router};