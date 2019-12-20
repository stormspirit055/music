import { isDef } from '@/utils'
export  const getUser = (state) =>  state.user
export const isLogin = (state) => isDef(state.user.userId)
export const menuList = (state) => {
  const {user, userPlaylist} = state
  const myId = user.userId
  const retrunMenu = []
  const createList = []
  const collectList = []
  userPlaylist.forEach(v => {
    let item = {
      path: `/playlist/${v.id}`,
      meta: {
        title: v.name,
        icon: 'gedan'
      }
    }
    if (v.userId === myId) {
      createList.push(item)
    } else {
      collectList.push(item)
    }
  })
  if (createList.length) {
    retrunMenu.push({
      title: '我的歌单',
      children: createList
    })
  }
  if (collectList.length) {
    retrunMenu.push({
      title: '收藏的歌单',
      children: collectList
    })
  }
  console.log(retrunMenu)
  return retrunMenu
}