
function isDate(date){

    if(!date)return false;
    
    date = date.split('-');

    if(date.length!=3)return false;

    for(let i=0; i<date.length; i++){
        if(typeof Number(date[i]) != "number" )return false;
        if(Number(date[i]) == NaN)return false;
    }
    
    return true;

}

export {isDate}