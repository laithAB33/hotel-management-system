import { mongoose ,Schema} from "mongoose";

const HotelSchema = new Schema({
    name:{
        type: String,
        required: [true,"the hotel name is required"],
        minLength: 2,
        maxLength: 25,
        unique: [true,"this hotel name already exists"]
    },
    country:{
        type: String,
        default:null,
        minLength: 2,
        maxLength: 25, 
    },
    area:{
        type: String,
        required: [true,"the area name is required"],
        minLength: 2,
        maxLength: 25, 
    },
    services:{
        wifi:{
            type: Boolean,
            required:true,
        },
        parking:{
            type: Boolean,
            required:true,  
        },
        Dinner:{
            type: Boolean,
            required:true,  
        },
        swimmingPool:{
            type: Boolean,
            required:true,  
        }
    },
    picture:{
        url:{
            type:String,
            default:null,
        },
        public_id:{
            type:String,
            default:null,
        }
    },
    description:{
        type:String,
        default:null,
    }

})

const Hotel = mongoose.model('hotel',HotelSchema);

export {Hotel};