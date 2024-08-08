import {mongoose,Schema} from "mongoose";
import validator from "validator";
const { isEmail } = validator;

let userShema = new Schema({

    userEmail:{
        type: String,
        validate:{
            validator: isEmail,
            message: "this is not a valid email"
        },
        unique: [true, "invalid email or password"],
        require:[true,"the email is required"],
        minLength: 10,
    },
    password: {
        type: String,
        required:[true,"the password is required"],
    },
    refreshToken:{
        type: String,
    },
    Admin:{
        type:Boolean,
        default:false,
    }
});

const User = mongoose.model('user',userShema);

export {User};