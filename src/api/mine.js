import request from '@/utils/request'

export const confirmMine = (data)=>{
    return request({
        url:'/mine/newaddress',
        method:'POST',
        data
    })  
}


export const getAddress = ()=>{
    return request({
        url:'/mine/address',
        method:'GET'
    })
}

export const deleteFn = (params)=>{
    return request({
        url:'/mine/delete',
        params
    })
}