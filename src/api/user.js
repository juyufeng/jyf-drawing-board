import request from '@/utils/request'

// 用户登录即注册
export function userAuthention(data) {
  return request.post('/ByteFire/Auth/userAuthention', data)
}

// 发送验证码
export function sendPhoneCode(data) {
  return request.post('/ByteFire/Auth/sendPhoneCode', data)
}

// 隐私政策
export function privacyPolicy(data) {
  return request.post('/ByteFire/Auth/privacyPolicy', data)
}

// 服务条款
export function termsService(data) {
  return request.post('/ByteFire/Auth/termsService', data)
}





