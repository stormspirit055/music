import axios from 'axios'
import { Notification } from 'element-ui'
export const request = createBaseInstance()
function createBaseInstance() {
  const instance = axios.create({
    baseURL: 'http://47.98.146.129:3000/',
  })
  instance.interceptors.request.use((config) => {
    return config
  }, error => {
    console.log(error)
  })
  instance.interceptors.response.use((data) => {
    if (data.status === 200 && data.data.code == 200) {
      return Promise.resolve(data.data)
    } else {
      Notification({
        title: '提示',
        message: data.data.message,
        type: 'error'
      })
    }
  }, error => {
    console.log(error.response)
    Notification({
      title: '提示',
      message: error.response.data.message,
      type: 'error'
    })
    return Promise.reject(error.response)
  })
  return instance
}
