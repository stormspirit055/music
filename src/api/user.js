import { request } from '@/utils/request'

export const login = data => request.get(`/login/cellphone?phone=${data.phone}&password=${data.password}`)