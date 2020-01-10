<template>
  <div class='artists-wrap'>
    <div class="w-list">
      <div class="l-item" v-for='(item ,index) in userprofiles' :key='index'>
        <img class='i-avatar' v-if='item.avatarUrl' v-lazy="$utils.generateImgurl(item.avatarUrl, 60)" alt="">
        <img class='i-avatar' v-if='!item.avatarUrl' src='/src/assets/default_avatar.jpg' alt="">
        <div class="i-name">
           <Highlight :keywords='keywords' :text='item.nickname' />
           <Icon v-if='item.gender === 2' class='nv' type='nv' />
          <Icon v-else type='nan' class='nan' />
        </div>
        <div class="i-identify" v-if='item.signature'>{{item.signature}}</div>
      </div>
    </div>
    <div class="w-empty" v-if='!total && getResult' >没有找到与 <span>'{{keywords}}'</span> 的相关用户</div>
    <Pagination v-if='total > pageSize' @pagechange='_handlePageChange' :total='total'  :pageSize='pageSize' />
  </div>
</template>

<script>
import { searchResult } from '@/api'
import { typeMap } from './config'
export default {
  name: 'Artists',
  data () {
    return {
      userprofiles: [],
      loading: false,
      pageSize: 30,
      pageNum: 1,
      total: 0,
      getResult: !1
    };
  },
  methods: {
    async _handleSearch() {
      this.$emit('update', false)
      const { result } = await searchResult({keywords: this.keywords, offset: (this.pageNum - 1) * this.pageSize, type: typeMap['TYPE_USERS'].type })
      const { userprofileCount, userprofiles} = result
      this.total = userprofileCount
      this.$parent.total = userprofileCount
      this.userprofiles = userprofiles
      this.$emit('update', true)
      this.getResult = !0
    },
    _handlePageChange(e) {
      this.pageNum = e
      this._handleSearch()
    },
  },
  computed: {
    keywords() {
      return this.$route.params.keywords
    }
  },
  watch: {
    keywords: {
      handler(newV) {
        this._handleSearch()
      },
      immediate: !0
    }
  }
}
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.artists-wrap{
  .w-list{
    .l-item{
      display: flex;
      align-items: center;
      height: 80px;
      padding-left: 30px;
      background: #212121;
      position: relative;
      cursor: pointer;
      &:nth-child(2n) {
        background: #252525;
      }
      &:hover{
        background: #2e2e2e !important;
        color: #fff !important;
      }
      .i-avatar{
        width: 60px;
        height: 60px;
        border-radius: 6px;
        margin-right: 12px;
      }
      .i-name{
        color: $grey;
        font-size:$font-size-medium-sm;
        display: flex;
        align-items: center;
        span{
          color: #888;
        }
        i{
          margin-left: 4px;
        }
        .nan{
        color: #1296db !important;
        }
        .nv{
          color: #ff254d !important;
        }
      }
      .i-identify{
        position: absolute;
        width: 150px;
        @include limit-line(1);
        right: 40px;
        top: 50%;
        margin-top: -6px;
        font-size: $font-size-sm;
        color: $grey;
      }
    }
  }
  .w-empty{
    position: relative;
    text-align: center;
    color: #fff;
    margin-top: 50px;
    span{
      color: $blue;
    }
  }
}
</style>