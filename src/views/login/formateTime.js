import {useuser} from '@/store/user'


export  const formateTime = ()=>{
const userStore = useuser()
const now = userStore.nowtime
const time = new Date(now)
let y = time.getFullYear()
let m = time.getMonth() + 1
let d = time.getDate()
let h = time.getHours()
let f = time.getMinutes()
let s = time.getSeconds()
d+=3

if(y % 4 === 0){
    if(d > 28){
        if(m === 2){
            d = d - 28
            m++
        }
    }
    if([1,3,5,7,8,10,12].indexOf(m)){
        if(d > 31){
            d = d - 31
            m++
            if(m > 12){
                m = m - 12
                y++
            }
            
        }
        
    }
    if([4,6,9,11].indexOf(m)){
        if(d > 30){
            d = d - 30
            m++
        }
    }
    
}

if(y % 4 != 0){
    if(d > 28){
       
        if(m === 2 && y % 4 != 0){
            d = d - 29
            m++
        }
    }
    if([1,3,5,7,8,10,12].indexOf(m)){
        if(d > 31){
            d = d - 31
            m++
            if(m > 12){
                m = m - 12
                y++
            }
           
        }
        
    }
    if([4,6,9,11].indexOf(m)){
        if(d > 30){
            d = d - 30
            m++
        }
    }
}

    y = y,
    m = ("0" + m).slice(-2),
    d = ("0" + d).slice(-2),
    h = ("0" + h).slice(-2),
    f = ("0" + f).slice(-2),
    s = ("0" + s).slice(-2);
userStore.future = y + '-' + m + '-' + d + ' ' + h + ":" + f + ":" + s
// const middle = userStore.future
userStore.future = new Date(userStore.future).getTime()


}