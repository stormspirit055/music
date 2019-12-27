import { request } from '@/utils/request'
//发现页 banner
export const getBanner = () => request.get('/banner/type=0')
// 推荐歌单
export const getRecommendSongsheet = () => request.get('/recommend/resource')
// 每日推荐的歌曲
export const getRecommendSongs = () => request.get('/recommend/songs')
//推荐新音乐
export const getNewRecommendSongs = () => request.get('/personalized/newsong')
//推荐mv
export const getRecommendMv = () => request.get('/personalized/mv')
//推荐电台
export const getRecommendRadio = () => request.get('/personalized/djprogram')
