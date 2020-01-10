<template>
  <div>
    <Panel v-if='isShowSearchPanel' :doms='doms'  @update='setSearchPanelState(false)'>
        <div class='search-panel'>
          <div class="p-default" v-if='!list.length || !innerkeywords'>
            <div class="d-hot">
              <div class="title">热门搜索</div>
              <div class="list">
                <div class="hot-item" @click='_handleSearch(item.first)' v-for='(item, index) in hots' :key='index'>{{item.first}}</div>
              </div>
            </div>
            <div class="d-history" v-if='searchHistory.length'>
              <div class="title">搜索历史</div>
              <div class="list">
                <div class="hot-item his-item" @click='_handleSearch(item)' v-for='(item, index) in searchHistory' :key='index'>
                  {{item}}
                  <Icon type='del' @click='_handleDel(item)' />
                </div>
              </div>
            </div>
          </div>
          <div class="p-suggest" v-else>
            <div class="s-item" v-for='(item, index) in list' :key='index'>
              <div class="i-title" @click='_handleGoSearch(item.type)'>
                <Icon :type='item.icon' />
                {{item.label}}
              </div>
              <div class="i-list">
                <div class='l-item' @click='_handleClick(line)' v-for='(line, index) in item.info' :key='index'>
                  <Highlight  :keywords='innerkeywords' :text='line.text' />
                </div>
              </div>
            </div>
          </div>
        </div>
    </Panel>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from '@/store/helper/music'
import { globalMapState } from '@/store/helper/global'
import { noImpactNodeMap } from '@/config'
import { generateSong } from '@/utils'
import { searchSuggest, getHotSearch, getSongDetail } from '@/api'
import storage from 'good-storage'
export default {
  name: 'Searchpanel',
  props: ['keywords'],
  data () {
    return {
      innerkeywords: '',
      doms: noImpactNodeMap['SEARCH_PANEL'],
      hots: [],
      timer: '',
      list: [],
      typeMap: {
        albums: {
          icon: 'zhuanji',
          label: '专辑',
          path: 'albums'
        },
        songs: {
          icon: 'yinle',
          label: '单曲',
          path: 'songs'
        },
        artists: {
          icon: 'geshou',
          label: '歌手',
          path: 'artists'
        },
        mvs: {
          icon: 'shipin',
          label: '视频',
          path: 'mvs'
        }
      }
    };
  },

  mounted(){
    this._getHotSearch()
  },
  methods: {
    ...mapMutations(['setSearchPanelState', 'setPlayPanelState']),
    ...mapActions(['startSong']),
    _handleSearch(innerkeywords) {
      this.setPlayPanelState(false)
      this.$emit('updatekeywords', innerkeywords)
      this.innerkeywords = innerkeywords
      this._handleGoSearch('songs')
    },
    async _getHotSearch() {
      const { result } =   await getHotSearch()
      this.hots = result.hots
    },
    _handleGoSearch(type) {
      this.$router.push({path: `/searchpage/${this.innerkeywords}/${type}`})
      this.setSearchPanelState(false)
    },
    _handleDel(item) {
      const index = this.searchHistory.findIndex(v => v == item)
      this.searchHistory.splice(index, 1)
      storage.set('SEARCH_HISTORY', this.searchHistory)
    },
    async _searchSuggest() {
      if (!this.innerkeywords.trim()) return
      let { result } = await searchSuggest({ keywords: this.innerkeywords })
      if (!result.order) return
      const { order } = result
      const list = []
      order.forEach(v => {
        if (!Object.keys(this.typeMap).includes(v))  return
        list.push({
          type: v,
          info: this._generateInfo(result[v], v),
          icon: this.typeMap[v].icon,
          label: this.typeMap[v].label,
          path: this.typeMap[v].path,
        })
      })
      console.log(list)
      this.list = list
    },
    _generateInfo(info, type) {
      switch(type) {
        case 'artists': 
          return info.map(v => {
            return {
              id: v.id,
              text: v.name,
              type: 'artists'
            }
          })
        case 'albums': 
          return info.map(v => {
            return {
              id: v.id,
              text: v.name + ' - ' + v.artist.name,
              type: 'albums'
            }
          })
        case 'songs': 
          return info.map(v => {
            const { 
              artists,
              id,
              name,
              mvid,
              duration,
              album,
            } = v
            let artistsText = ''
            for(let v of artists) {
              artistsText += (v.name + ' / ')
            }
            artistsText = artistsText.slice(0, artistsText.length - 2)
            return generateSong({
              id,
              name,
              text: name + ' - ' + artistsText,
              type: 'songs',
              albumId: album.id,
              mvid,
              duration,
              artists,
              isSheet: !1
            })
          })
        case 'mvs': 
          return info.map(v => {
            return {
              id: v.id,
              text: v.name + ' - ' + v.artistName,
              type: 'mvs'
            }
          })

      }
    },
    _handleClick(line) {
      this.setSearchPanelState(false)
      switch(line.type) {
        case 'songs': 
          this.startSong(line);
          break;
        case 'mvs' :
          this.$router.push({ path: '/mvdetail', query: { id: line.id, type: 'mv' }})
          break;
        case 'albums' :
          this.$router.push({ path: `/songsheet/${line.id}`, query: { type: 'album' }})
          break;
      }
      this.setSearchPanelState(false)
    }
  },
  components: {},
  computed: {
    ...mapState(['isShowSearchPanel']),
    ...globalMapState(['searchHistory']),
  },
  watch: {
    keywords(newV) {
      this.innerkeywords = newV
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this._searchSuggest()
      }, 500)
    }
  }
}
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.search-panel{
  width: 360px;
  padding-top: 18px;
  .p-default{
    padding-left: 18px;
    .title{
      color: $grey;
      font-size: $font-size;
      margin-bottom: 20px;
    }
    .list{
      display: flex;
      flex-wrap: wrap;
      .hot-item{
        padding: 0 18px;
        height: 26px;
        line-height: 26px;
        box-sizing: border-box;
        border: 1px solid #888;
        border-radius: 13px;
        text-align: center;
        color: $font-normal-color;
        font-size: $font-size;
        margin-right: 14px;
        margin-bottom: 14px;
        cursor: pointer;
      }
      .his-item{
        display: flex;
        align-items: center;
        padding-right: 2px !important;
        &:hover{
          i{
            opacity: 1;
          }
        }
        i{
          margin-left: 2px;
          opacity: 0;
          color: $font-normal-color !important;
        }
      }
    }
  }
  .p-suggest{
    .s-item{
      margin-bottom: 10px;
      .i-title{
        padding-left: 18px;
        color: $grey;
        display: flex;
        align-items: center;
        font-size: $font-size-sm;
        margin-bottom: 20px;
        cursor: pointer;
        i {
          color: $grey !important;
          margin-right: 6px;
        }
      }
      .i-list{
        .l-item{
          padding: 5px 10px 5px 38px;
          line-height: 1.5;
          cursor: pointer;
          margin-bottom: 15px;
          color: $font-normal-color;
          font-size: $font-size;
          &:hover{
            color: #fff !important;
            background: #373737 !important;
          }
        }
      }
    }
  }
}
</style>