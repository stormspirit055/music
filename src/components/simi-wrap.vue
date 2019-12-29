<template>
  <div class='simi-wrap'>
    <div class="w-title">{{titleMap[type]}}</div>
    <div class="w-list">
      <component  v-for='(item, index) in listData' :key='index' :is="comName" :info='item'></component>
    </div>
  </div>
</template>

<script>
import Simisong from '@/components/simi-song'
import Simiuser from '@/components/simi-user'
import Simisheet from '@/components/simi-sheet'
import  { generateSong } from '@/utils'
import { getSimiUser, getSimiSong, getSimiSheet } from '@/api'
export default {
  name:'Simiwrap',
  props: ['id', 'type'],
  data () {
    return {
      titleMap: {
        user: '喜欢这首歌的人',
        song: '相似歌曲',
        sheet: '包含这首歌的歌单'
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
      }
    },
    async _getSimiUser() {
      let { userprofiles } = await getSimiUser({ id: this.id })
      this.listData = userprofiles.map(v => {
        const { gender, nickname, userId, recommendReason, avatarUrl } = v
        return {
          gender, nickname, userId, recommendReason, avatarUrl
        }
      })
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
  },
  components: {
    Simisheet,
    Simiuser,
    Simisong
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