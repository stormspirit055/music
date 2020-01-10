<template>
  <div class='simi-wrap' v-if='listData.length'>
    <div class="w-title">{{titleMap[type]}}</div>
    <div class="w-list">
      <component  v-for='(item, index) in listData' :key='index' :is="comName" :type='type' :info='item'></component>
    </div>
  </div>
</template>

<script>
import Simisong from '@/components/simi-song'
import Simiuser from '@/components/simi-user'
import Simisheet from '@/components/simi-sheet'
import Simimv from '@/components/simi-mv'
import  { generateSong } from '@/utils'
import { getSimiUser, getSimiSong, getSimiSheet, getSimiMv, getVideoRelated } from '@/api'
export default {
  name:'Simiwrap',
  props: ['id', 'type'],
  data () {
    return {
      titleMap: {
        user: '喜欢这首歌的人',
        song: '相似歌曲',
        sheet: '包含这首歌的歌单',
        mv: '相关mv',
        video: '推荐视频'
      },
      comName: '',
      listData: []
    };
  },
  mounted(){},
  methods: {
    _getData() {
      switch(this.type) {
        case 'user':
          this.comName = 'Simiuser'
          this._getSimiUser()
          break;
        case 'song': 
          this.comName = 'Simisong'
          this._getSimiSong();
          break;
        case 'sheet': 
          this.comName = 'Simisheet'
          this._getSimiSheet();
          break;
        case 'mv': 
          this.comName = 'Simimv'
          this._getSimiMv();
          break;
        case 'video': 
          this.comName = 'Simimv'
          this._getVideoRelated();
          break;
      }
    },
    async _getSimiUser() {
      let data = await getSimiUser({ id: this.id })
      if(!data) return
      const { userprofiles }  = data
      this.listData = userprofiles.map(v => {
        const { gender, nickname, userId, recommendReason, avatarUrl } = v
        return {
          gender, nickname, userId, recommendReason, avatarUrl
        }
      })
    },
    async _getVideoRelated() {
       let { data } = await getVideoRelated({ id: this.id })
       data.forEach(v => {
         v.playCount = v.playTime
         v.cover = v.coverUrl
         v.id = v.vid
         v.name = v.title
         v.artistName = v.creator[0].userName
         v.duration = v.durationms
       })
       console.log(data)
      this.listData = data
    },
    async _getSimiSong() {
      const { songs } = await getSimiSong({ id: this.id })
      this.listData = songs.map(v => {
        const {
          id,
          name,
          duration,
          mvid,
          album: {
            picUrl,
            artists,
          }
        } = v
        let singerText = ''
        for (let v of artists) {
          singerText += (v.name + '  ')
        }
        return generateSong({
          id,
          name,
          picUrl,
          artists,
          duration,
          mvid,
          singerText,
          albumName: v.album.name,
          albumId: v.album.id,
          inSheet: !1
        })
      })
      console.log(this.listData)
    },
    async _getSimiSheet() {
      let { playlists } = await getSimiSheet({ id: this.id })
      this.listData = playlists.map(v => {
        const {id, coverImgUrl, name, playCount} = v
        return {
          id, coverImgUrl, name, playCount
        }
      })
    },
    async _getSimiMv() {
      let { mvs } = await getSimiMv({ mvid: this.id })
      this.listData = mvs
    },
    async _getSimiVideo() {
      let result = await getVideoRelated({ id: this.id })
      console.log(result)
    }
  },
  components: {
    Simisheet,
    Simiuser,
    Simisong,
    Simimv
  },
  computed: {},
  watch: {
    id: {
      handler(newV) {
        if (!newV) return
        this._getData()
      },
      immediate: !0
    }
  }
}
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.simi-wrap{
  margin-bottom: 40px;
  .w-title{
    font-size: 16px;
    font-weight: 500;
    color: $grey;
    margin-bottom: 15px;
  }
}
</style>