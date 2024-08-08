import bcryptjs from 'bcryptjs';
import {appError} from './appError.js';

async function authentication(UserPass,DBpassword){

    let auth = await bcryptjs.compare(UserPass,DBpassword);
    if(!auth){
        let error = new appError("wrong email or password",400, "fail");
        throw error;
    }

}

export {authentication};