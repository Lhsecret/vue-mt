// 获取会话存储值  getSession('user',{})
export const getSession = (key, type) => {
    // type 如果存储内无值 [] {} null false 
    let item = JSON.parse(sessionStorage.getItem(key))
    if ((String(item) === 'null')) {
      // null的情况就使用用户传入的初始值 
      item = type
    }
    return item
  }
  
  // 设置会话存储值
  export const setSession = (key, item) => {
    // item 需要存入的数据 
    return sessionStorage.setItem(key, JSON.stringify(item))
  }
  
  // 获取永久存储值 
  export const getLocal = (key, type) => {
    let item = JSON.parse(localStorage.getItem(key))
  
    if (String(item) === 'null') {
      item = type
    }
    return item
  }
  
  // 设置永久存储值
  export const setLocal = (key, item) => {
    return localStorage.setItem(key, JSON.stringify(item))
  }
  
  // 全部删除会话存储
  export const removeAllItem = () => {
    // localStorage.clear()
    sessionStorage.clear()
  }
  
  export const removeItem = (key) =>{
    sessionStorage.removeItem(key)
  }

  export const removeLocalItem = (key) => {
    localStorage.removeItem(key)
    // sessionStorage.clear()
  }
  
  
  