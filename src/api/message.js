import request from '@/utils/request'

export function MessagePost(data) {
  return request.post('/ByteFire/Message/post', data)
}








