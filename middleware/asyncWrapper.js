function asyncWrapper(fn){

    return (req,res,next) => {
        fn(req,res,next).catch(err =>{
            
            next(err);
        })
    }
}


export {asyncWrapper};