import axios from 'axios'

import router from './router/index'
axios.defaults.baseURL = "http://localhost:8080/api"

axios.interceptors.request.use(config => {
  const token = localStorage.getItem("token")
  token ? config.headers.Authorization = token : null
  return config
})

axios.interceptors.response.use(res => {
  if (res.data.res_code === 401) {
    router.push('/login')
  }
  return res
})


export default axios