import jwt from 'jsonwebtoken';

let genrateToken = (payload,tokenName)=>{

    let Token = jwt.sign(payload,process.env[`${tokenName}`] ,
    { expiresIn: tokenName=="REFRESH_TOKEN_SECRET"?"365d":"30m"})

    return Token;
}

export {genrateToken};