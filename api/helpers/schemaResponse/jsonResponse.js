'use strict'

function getOk(data, extraData){
    return {
        resp: {
            status: 1, 
            total: data.length, 
            message: "ok", 
            ...extraData
        }, 
        result:data
        
    }
}

function getKo(err,code){
    return {
        status: 0, 
        message: '',
        code: code, 
        info: JSON.stringify(err)
    }
}

module.exports = {
    getOk, 
    getKo
}