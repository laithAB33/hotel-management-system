function figureStatus(statusCode){
    return statusCode>=400&&statusCode<500?"fail":"error"
}
export {figureStatus};