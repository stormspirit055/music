import axios from 'axios'
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
    data = data.data
    if (data.code === 200) {
      return data.result
    }
    console.log(data)
  }, error => {
    console.log(error)
  })
  return instance
}
