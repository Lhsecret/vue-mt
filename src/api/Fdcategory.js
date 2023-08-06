import request from '@/utils/request'

export const getFdcategory = ()=>{
    return request({
        url:'/v1/Fdcategory',
        method:'GET'
    })
}


export const getLunbo = ()=>{
    return request({
        url:'/v1/Lunbo',
        method:'GET'
    })
}