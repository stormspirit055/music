import { request } from '@/utils/request'
//获取歌曲详情
export const getSongDetail = (params) => request.get('/song/detail', { params})
// 获取歌曲uRL
export const getSongUrl = (params) => request.get('/song/url', { params})
// 获取歌词
export const getSongLyric = (params) => request.get('/lyric', { params})
// 获取歌曲评论
export const getSongComment = (params) => request.get('/comment/music', { params})
// 获取相似歌曲
export const getSimiSong = (params) => request.get('/simi/song', { params})
// 获取最近5个听了这首歌的用户
export const getSimiUser = (params) => request.get('/simi/user', { params})
// 热门搜索
export const getHotSearch = (params) => request.get('/search/hot', { params})
// 专辑评论
export const getAlbumComment = (params) => request.get('/comment/album', { params})
// 私人fm
export const getFm = () => request.get('/personal_fm')
// 私人fm跳下一首
export const getFmNext = () => request.get('/personal/fm/skip' )
// 新歌速递
export const getTopsong = (params) => request.get('/top/song', { params} )
