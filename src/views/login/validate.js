export const validatePassword = (rule, value, cb) => {
    let regpass = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
  
    if (regpass.test(value)) {
      // 校验成功
      cb()
    } else {
      // 校验不成功
      cb(new Error('密码格式不正确'))
    }
  }