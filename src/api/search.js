import { request } from '@/utils/request'

export const search = keywords => request.get(`/search?keywords=${keywords}`)