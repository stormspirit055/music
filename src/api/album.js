import { request } from '@/utils/request'
//新碟上架 该接口不可用
export const getTopAlbum = (params) => request.get('/top/album', { params })
// 专辑内容
export const getAlbumDetail = (params) => request.get('/album', { params })
// 专辑评论
export const getAlbumComment = (params) => request.get('/comment/album', { params })
