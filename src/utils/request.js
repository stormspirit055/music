import axios from 'axios'
export const request = createBaseInstance()
function createBaseInstance() {
  const instance = axios.create({
    baseURL: 'http://47.98.146.129:3000/',
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
      console.log(data)
      // Notification({
      //   title: '提示',
      //   message: data.data.message,
      //   type: 'error'
      // })
    }
  }, error => {
    console.error(error.response)
  })
  return instance
}
