import storage from 'good-storage'
import Router from 'vue-router'
import Vue from 'vue'
// const Discoveryindex = () => import(/* webpackChunkName: "index1" */ '@/view/discovery')
const SongSheet = () => import(/* webpackChunkName: "index" */ '@/view/songsheet')
const SearchPage = () => import(/* webpackChunkName: "SearchPage" */ '@/view/searchpage')
const Mvdetail = () => import(/* webpackChunkName: "Mvlist" */ '@/view/mvdetail')
// const Discovery = () => import(/* webpackChunkName: "index" */ '@/view/discovery/recommend')
const Videolist = () => import(/* webpackChunkName: "videoList" */ '@/view/videos/mvlist')
const Mvlist = () => import(/* webpackChunkName: "Mvlist" */ '@/view/videos/mvlist')
const Videoindex = () => import(/* webpackChunkName: "videoList" */ '@/view/videos')
const searchSongs = () => import(/* webpackChunkName: "SearchPage" */ '@/view/searchpage/songs')
const searchAlbums = () => import(/* webpackChunkName: "SearchPage" */ '@/view/searchpage/albums')
const searchMvs = () => import(/* webpackChunkName: "SearchPage" */ '@/view/searchpage/mvs')
const searchArtists = () => import(/* webpackChunkName: "SearchPage" */ '@/view/searchpage/artists')
const searchRadios = () => import(/* webpackChunkName: "SearchPage" */ '@/view/searchpage/artists')
const searchUsers = () => import(/* webpackChunkName: "SearchPage" */ '@/view/searchpage/users')
const searchSongsheet = () => import(/* webpackChunkName: "SearchPage" */ '@/view/searchpage/songsheet')
const DiscSongsheet = () => import(/* webpackChunkName: "Disc" */ '@/view/discovery/songsheet')
const DiscNewmusic = () => import(/* webpackChunkName: "Disc" */ '@/view/discovery/newmusic')
const DiscRank = () => import(/* webpackChunkName: "Disc" */ '@/view/discovery/rank')
import Discoveryindex from '@/view/discovery' 
// import Videoindex from '@/view/videos'
import Discovery from '@/view/discovery/recommend'
// import Videolist from '@/view/videos/videolist'
// import Mvlist from '@/view/videos/mvlist'
// import SongSheet from '@/view/songsheet'
// import SearchPage from '@/view/searchpage'
// import Mvdetail from '@/view/mvdetail'
// import searchSongs from '@/view/searchpage/songs'
// import searchAlbums from '@/view/searchpage/albums'
// import searchMvs from '@/view/searchpage/mvs'
// import searchArtists from '@/view/searchpage/artists'
// import searchRadios from '@/view/searchpage/radios'
// import searchUsers from '@/view/searchpage/users'
// import searchSongsheet from '@/view/searchpage/songsheet'

// import DiscSongsheet from '@/view/discovery/songsheet'
// import DiscNewmusic from '@/view/discovery/newmusic'
// import DiscRank from '@/view/discovery/rank'
import  store  from '@/store'



Vue.use(Router)
export const menuRoutes = [
  {
    path: '/discovery',
    component: Discoveryindex,
    // name: 'discovery',
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
      // {
      //   path: 'radios',
      //   name: 'discradios',
      //   component: DiscRadios,
      //   meta: { title: '主播电台' }
      // },
      {
        path: 'rank',
        name: 'discrank',
        component: DiscRank,
        meta: { title: '排行榜' }
      },
      // {
      //   path: 'singer',
      //   name: 'discsinger',
      //   component: DiscSinger,
      //   meta: { title: '歌手' }
      // },
      {
        path: 'newmusic',
        name: 'discnewmusic',
        component: DiscNewmusic,
        meta: { title: '最新音乐' }
      },
    ]
  },
 
  
  {
    path: '/videos',
    component: Videoindex,
    meta: {
      title: '视频',
      icon: 'shipin',
    },
    children: [
      {
        path: '/',
        redirect: 'videolist'
      },
      {
        path: 'videolist',
        name: 'videolist',
        component: Videolist,
        meta: { title: '视频' }
      },
      {
        path: 'mvlist',
        name: 'mvlist',
        component: Mvlist,
        meta: { title: 'mv' }
      },
    ]
  },
  // {
  //   path: '/friends',
  //   name: 'friends',
  //   component: Discovery,
  //   meta: {
  //     title: '朋友',
  //     icon: 'pengyou',
  //   },
  // },
  // {
  //   path: '/fm',
  //   name: 'fm',
  //   component: Fm,
  //   meta: {
  //     title: '私人fm',
  //     icon: 'yinlediantai',
  //   },
  // },
]
const router = new Router({
  routes: [
    ...menuRoutes,
    {
      path: '/',
      redirect: 'discovery'
    },
    {
      path: '/songsheet/:id',
      component: SongSheet,
      name: 'songsheet',
      meta: {title: '歌单'}
    },
    {
      path: '/mvdetail',
      component: Mvdetail,
      name: 'mvdetail',
      meta: {title: 'mv详情'}
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
  if (to.name !== 'discrecommend') {
    if(!storage.get('U_ID')) {
      store.commit('user/setLoginState', true)
      return
    }
  }
  if (to.name === 'mvdetail') {
    console.log(store)
    store.commit('music/setSongState', false)
  }
  next()
  // ...
})
export default router
