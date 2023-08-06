import request from '@/utils/request'

export const getshopFn = ()=>{
    return request({
        url:'/v1meishi/shop',
        method:'GET'
    })
}

export const getsearchshop = (params)=>{
    return request({
        url:'/v1meishi/isshow',
        method:'GET',
        params
    })
}