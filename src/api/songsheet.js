
import { request } from '@/utils/request'
// 获取歌单评论
export const getSongSheetComment = (params) => request.get('/comment/playlist', { params})
// 获取相似歌单
export const getSimiSheet = (params) => request.get('/simi/playlist', { params})
// 获取歌单详情
export const getSongSheetDetail = (params) => request.get('/playlist/detail', { params})
// 获取精品歌单
export const getQualitySongSheet = (params) => request.get('/top/playlist/highquality', { params})