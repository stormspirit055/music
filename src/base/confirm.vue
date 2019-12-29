<template>
  <el-dialog
    :title="title || '提示'"
    class='confirm-dialog'
    :visible.sync="dialogVisible"
    :width="$utils.toRem(300)"
    :before-close="handleClose">
    <div class='confirm-text'>{{text}}</div>
    <el-button  @click="handleClose">确 定</el-button>
  </el-dialog>
</template>

<script>
import Vue from "vue"
const Confirm = {
  data () {
    return {
      dialogVisible: !1
    };
  },
  props: ['title', 'text', 'onConfirm'],
  mounted(){},
  methods: {
    handleClose() {
      this.onConfirm && this.onConfirm()
      this.dialogVisible = !1
    },
    handleOpen() {
      this.dialogVisible = !0
    }
  }
}
export default Confirm
let instanceCache

export const confirm = function(text, title, onConfirm = () => {}) {
  if (typeof title === 'function') {
    onConfirm = title
    title = undefined
  }
  const ConfirmCtor = Vue.extend(Confirm)
  const getInstance = () => {
    if (!instanceCache) {
      instanceCache = new ConfirmCtor({
        propsData: {
          text,
          title,
          onConfirm
        }
      })
      instanceCache.$mount()
      document.body.appendChild(instanceCache.$el)
    } else {
      instanceCache.text = text
      instanceCache.title = title
      instanceCache.onConfirm = onConfirm
    }
    return instanceCache
  }
  const instance = getInstance()
  Vue.nextTick(() => {
    instance.dialogVisible = true
  })
}
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.confirm-dialog {
  /deep/.el-dialog__body {
    padding: 10px 20px 20px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .confirm-text{
      position: relative;
      width: 100%;
      margin-bottom: 20px;
    }
    button{
      width: 100px;
    }
  }
  /deep/.el-dialog__header{
    padding-top: 10px;
    .el-dialog__headerbtn{
      top: 10px;
    }
  }
  .confirm-body {
    line-height: 20px;
  }
  .confirm-btn {
    width: 100%;
  }
}
</style>