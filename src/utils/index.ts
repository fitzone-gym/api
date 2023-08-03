type responseType = {
    success:boolean,
    data:null | any,
    error:null | any,
    metadata:{
        timestamp:Date,
        length?:number
    }
}

export const generateResponse = (success:boolean = false, data:null | any=null, error:null | any=null) => {
    let temp:responseType ={
        success,
        data,
        error,
        metadata:{
            timestamp:new Date(),
        }
    }

    if(data !== null && Array.isArray(data)){
        temp.metadata.length = data.length
    }
    return temp
}