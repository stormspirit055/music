import { request } from '@/utils/request'
//搜索结果
export const searchResult = (params) => request.get('/search', { params })
//搜索建议
export const searchSuggest = params => request.get('/search/suggest', { params })
//多重匹配
export const searchMatch = params => request.get('/search/multimatch', { params })