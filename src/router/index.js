import Router from 'vue-router'
import Vue from 'vue'
import Discovery from '@/view/discovery'
import Fm from '@/view/fm'
import SongSheet from '@/view/songsheet'
import SearchPage from '@/view/searchpage'
import Timeline from '@/view/timeline'
import Mv from '@/view/mv'
import searchSongs from '@/view/searchpage/songs'
import searchAlbums from '@/view/searchpage/albums'
import searchMvs from '@/view/searchpage/mvs'
import searchArtists from '@/view/searchpage/artists'
import searchRadios from '@/view/searchpage/radios'
import searchUsers from '@/view/searchpage/users'
import searchSongsheet from '@/view/searchpage/songsheet'
Vue.use(Router)
export const menuRoutes = [
  {
    path: '/discovery',
    name: 'discovery',
    component: Discovery,
    meta: {
      title: '发现音乐',
      icon: 'yinle1',
    },
  },
  {
    path: '/fm',
    name: 'fm',
    component: Fm,
    meta: {
      title: '私人fm',
      icon: 'yinlediantai',
    },
  },
  {
    path: '/video',
    name: 'video',
    component: Discovery,
    meta: {
      title: '视频',
      icon: 'shipin',
    },
  },
  {
    path: '/friends',
    name: 'friends',
    component: Discovery,
    meta: {
      title: '朋友',
      icon: 'pengyou',
    },
  },
]
const router = new Router({
  routes: [
    ...menuRoutes,
    {
      path: '/',
      redirect: 'discovery',
    },
    {
      path: '/discovery',
      component: Discovery,
      name: 'Discovery',
      meta: {title: '发现音乐'}
    },
    {
      path: '/timeline',
      component: Timeline,
      name: 'timeline',
      meta: {title: '动态'}
    },
    {
      path: '/songsheet/:id',
      component: SongSheet,
      name: 'songsheet',
      meta: {title: '歌单'}
    },
    {
      path: '/mv',
      component: Mv,
      name: 'mv',
      meta: {title: '视频'}
    },
    {
      path: '/searchpage/:keywords',
      component: SearchPage,
      props: true,
      children: [
        {
          path: '/',
          redirect: 'songs',
          name: 'default'
        },
        {
          path: 'songs',
          name: 'searchSongs',
          component: searchSongs,
          meta: { type: 'TYPE_SONGS' }
        },
        {
          path: 'albums',
          name: 'searchAlbums',
          component: searchAlbums,
          meta: { type: 'TYPE_ALBUMS' }
        },
        {
          path: 'radios',
          name: 'searchRadios',
          component: searchRadios,
          meta: { type: 'TYPE_RADIOS' }
        },
        {
          path: 'users',
          name: 'searchUsers',
          component: searchUsers,
          meta: { type: 'TYPE_USERS' }
        },
        {
          path: 'mvs',
          name: 'searchMvs',
          component: searchMvs,
          meta: { type: 'TYPE_MVS' }
        },
        {
          path: 'artists',
          name: 'searchArtists',
          component: searchArtists,
          meta: { type: 'TYPE_ARTISTS' }
        },
        {
          path: 'songsheet',
          name: 'searchSongsheet',
          component: searchSongsheet,
          meta: { type: 'TYPE_SONGSHEET' }
        },
      ]
    }
  ]
})
export default router
