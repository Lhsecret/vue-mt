import request from '@/utils/request'

export const login = (data)=>{
    return request({
        url:'/login',
        method:'POST',
        data
    })
}

export const checkLogin = ()=>{
    return request({
        url:'/login/checkLogin',
        method:'GET'
    })
}


export const loginout = ()=>{
    return request({
        url:'/login/loginout',
        method:"POST"
    })
}

export const Renewal = ()=>{
    return request({
        url:'/login/Renewal',
        method:"POST"
    })
}