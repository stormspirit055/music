import { request } from '@/utils/request'
//获取视频播放地址
export const getVideoUrl = params => request.get('/video/url', {params})
//获取mv播放地址
export const getMvUrl = params => request.get('/mv/url', {params})
//获取视频详情
export const getVideoDetail = params => request.get('/video/detail', {params})
//获取相关视频
export const getVideoRelated = params => request.get('/related/allvideo', {params})
//获取视频标签列表
export const getVideoTagList = params => request.get('/video/group/list')
//获取视频标签下的视频
export const getTagVideos = params => request.get('/video/group', {params})
//获取视频评论
export const getVideoComment = params => request.get('/comment/video', {params})
// 获取mv评论
export const getMvComment = params => request.get('/comment/mv', {params})
// 获取相似mv
export const getSimiMv = (params) => request.get('/simi/mv', { params})
// 获取mv详情
export const getMvDetail = (params) => request.get('/mv/detail', { params})
// 获取全部mv
export const getAllMv = (params) => request.get('/mv/all', { params})