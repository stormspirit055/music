import { request } from '@/utils/request'
//获取歌曲详情
export const getSongDetail = (params) => request.get('/song/detail', { params})
// 获取歌曲uRL
export const getSongUrl = (params) => request.get('/song/url', { params})

