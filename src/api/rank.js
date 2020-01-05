import { request } from '@/utils/request'
//歌手榜单
export const singerRank = (params) => request.get('/toplist/artist', { params })
//对应榜单
export const topRank = params => request.get('/top/list', { params })
// 所有榜单
export const allRank = params => request.get('/toplist', { params })
// 所有榜单内容摘要
export const rankDetail = params => request.get('/toplist/detail', { params })

