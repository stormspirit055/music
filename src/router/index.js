import Router from 'vue-router'
import Vue from 'vue'
import Discoveryindex from '@/view/discovery'
import Discovery from '@/view/discovery/recommend'
import Fm from '@/view/fm'
import Videos from '@/view/videos'
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

import DiscSongsheet from '@/view/discovery/songsheet'
import DiscNewmusic from '@/view/discovery/newmusic'
import DiscRadios from '@/view/discovery/radios'
import DiscRank from '@/view/discovery/rank'
import DiscSinger from '@/view/discovery/singer'
import  store  from '@/store'
Vue.use(Router)
export const menuRoutes = [
  {
    path: '/discovery',
    component: Discoveryindex,
    name: 'discovery',
    meta: {
      title: '发现音乐',
      icon: 'yinle1',
    },
    children: [
      {
        path: '/',
        redirect: 'recommend',
      },
      {
        path: 'recommend',
        name: 'discrecommend',
        component: Discovery,
        meta: { title: '个性推荐' }
      },
      {
        path: 'songsheet',
        name: 'discsongsheet',
        component: DiscSongsheet,
        meta: { title: '歌单' }
      },
      {
        path: 'radios',
        name: 'discradios',
        component: DiscRadios,
        meta: { title: '主播电台' }
      },
      {
        path: 'rank',
        name: 'discrank',
        component: DiscRank,
        meta: { title: '排行榜' }
      },
      {
        path: 'singer',
        name: 'discsinger',
        component: DiscSinger,
        meta: { title: '歌手' }
      },
      {
        path: 'newmusic',
        name: 'discnewmusic',
        component: DiscNewmusic,
        meta: { title: '最新音乐' }
      },
    ]
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
    component: Videos,
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

router.beforeEach((to, from, next) => {
  if (to.name === 'mv') {
    // const func = {
    //   ...mapMutations(['setSongState'])
    // }
    console.log(store)
    store.commit('music/setSongState', false)
    // console.log(mutations)
  }
  next()
  // ...
})
export default router
