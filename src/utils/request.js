import axios from 'axios'
import { Notification } from 'element-ui'
export const request = createBaseInstance()
function createBaseInstance() {
  const instance = axios.create({
    baseURL: '/netease-api',
    withCredentials: true
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
      message: error.response.data.msg ||  error.response.data.message,
      type: 'error'
    })
  })
  return instance
}
