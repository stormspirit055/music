import { request } from '@/utils/request'
//获取歌曲详情
export const getSongDetail = (params) => request.get('/song/detail', { params})
// 获取歌曲uRL
export const getSongUrl = (params) => request.get('/song/url', { params})
// 获取歌单详情
export const getSongSheetDetail = (params) => request.get('/playlist/detail', { params})
// 获取歌单评论
export const getSongSheetComment = (params) => request.get('/comment/playlist', { params})
// 获取歌词
export const getSongLyric = (params) => request.get('/lyric', { params})
// 获取歌曲评论
export const getSongComment = (params) => request.get('/comment/music', { params})
// 获取相似歌单
export const getSimiSheet = (params) => request.get('/simi/playlist', { params})
// 获取相似歌曲
export const getSimiSong = (params) => request.get('/simi/song', { params})
// 获取最近5个听了这首歌的用户
export const getSimiUser = (params) => request.get('/simi/user', { params})
