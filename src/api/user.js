import { request } from '@/utils/request'

// export const login = data => request.get(`/login/cellphone?phone=${data.phone}&password=${data.password}`)

export const login = params => request.get('/login/cellphone', {params})

export  const  getUserDetail = params => request.get('/user/detail', {params})

export const getUserPlaylist = (params) => request.get("/user/playlist", { params })