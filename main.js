import Express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import {globalErrorHandler} from './controllers/globalErrorHandler.js';
import {Router as hotelRouter} from './routes/hotelRouter.js';
import {Router as roomsRouter} from './routes/roomsRouter.js';
import {Router as usersRouter} from './routes/usersRouter.js';
import { Router as refreshRouter} from './routes/refreshRouter.js';

const PORT = process.env.PORT;
const app = Express();
mongoose.connect(process.env.MONGOBDB)
        .then(()=>{
            console.log("mongodb connected successfuly");
        })
        .catch((err)=>{
            console.log("mongodb connection error",err);
        })

app.use(cors());
app.use(Express.json());
app.use(cookieParser());

// routes ...
app.use('/api/hotel',hotelRouter);
app.use('/api/rooms',roomsRouter);
app.use('/api/users',usersRouter);
app.use('/api/refresh',refreshRouter);

app.use('*',(req,res) => {
    res.status(404).json({success: false,status:"fail",message:"this resource is not available",data:null})
})

app.use(globalErrorHandler);

app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`);
})



// review the reservation and rooms endpoint
// not sending photo in create hotel
// greate a room if fail upload a pic delete
