<template>
  <div class="upload-container">
    <el-button :style="{background:color,borderColor:color}" icon="el-icon-upload" size="mini" type="primary" @click=" dialogVisible=true">上传图片
    </el-button>

    <el-dialog 
      title="" top="8%" width="60%" 
      :visible.sync="dialogVisible" 
      :modal-append-to-body="false">
      <uploadListQuery @success="handlePictureSuccess"></uploadListQuery>
    </el-dialog>
  </div>
</template>

<script>

import uploadListQuery from '@/views/picture/uploadListQuery'

export default {
  name: 'EditorSlideUpload',
  components: {
    uploadListQuery
  },
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    handlePictureSuccess(list) {
      this.$emit('successCBK', list)
      this.dialogVisible = false
    }
  }
}
</script>
