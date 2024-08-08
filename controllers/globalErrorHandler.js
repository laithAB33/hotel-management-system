import {figureStatus} from '../utils/figureStatus.js'

function globalErrorHandler(error,req,res,next){

    let status = figureStatus(error.statusCode || 500);

    res.status(error.statusCode || 500).json( {

        success: false,
        status,
        message: error.message,
        data: null,
    } )

}
 
export {globalErrorHandler};