import{ mongoose, Schema } from "mongoose";

const roomSchema = new Schema({
    hotel:{
        type: String,
        required: [true,"the name of the hotel is required"],
        minLength: 2,
        maxLength: 20,
    },
    userEmail:{
        type:String,
        default: null,
    },
    vip:{
            type: Boolean,
            default: false,
    },
    reservationEnd:{
        type: Date,
        required: [true, "the reservation end date is required"],
    },
    size:{
        length: {
            type: Number,
            required: [true, "the size of the Room is required"],
        },
        width:{
            type: Number,
            required: [true, "the size of the Room is required"],
        }
    },
    beds:{
        type: Number,
        required: [true , "the number of the beds is required"],
    },
    price:{
        type:Number,
    },
    description:{
        type:String,
        default:"",
    }
});

const Room = mongoose.model("Room",roomSchema);

export {Room};
