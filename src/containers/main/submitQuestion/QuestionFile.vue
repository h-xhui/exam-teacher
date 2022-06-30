<template>
  <div>
    <el-row>
      <div class="text">
        <p><span style="color:red">模板上传注意事项：</span></p>
        <p>1.请提前下载模板上传</p>
        <p>2.模板类型可选(选择题-1，多选题-2，判断题-3，填空题-4，简答题-5) <span style="color:red">请填数字</span></p>
        <p>3.除了选择题，选择项请不要填</p>
      </div>
      <el-button :loading="loading" type="success" @click="getTemplate" class="btn">点击下载模板</el-button>
    </el-row>
    <el-row>
      <el-upload
        ref="QuestionFile"
        drag
        :limit="1"
        :before-upload="beforeUpload"
        :auto-upload="false"
        :on-success="handleSuccess"
        :on-error="handleError"
        :action="'api/question/importQuestion'+'?userId=' + userId + '&username=' + username" >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传excel文件，且不超过1MB</div>
      </el-upload>
      <el-button :loading="loading" type="primary" @click="upload" class="btn">确认上传</el-button>
    </el-row>
  </div>
</template>

<script>
import {exportExcel} from "../../../components/httpServer/api";

export default {
  name:'QuestionFile',
  data() {
    return {
      loading: false,
      userId:parseInt(localStorage.getItem("userId")),
      username:localStorage.getItem("username")
    }
  },
  methods: {
    // 上传文件
    upload() {
      this.$refs.QuestionFile.submit()
    },
    beforeUpload(file) {
      let isLt2M = true
      isLt2M = file.size / 1024 / 1024 < 10
      if (!isLt2M) {
        this.loading = false
        this.$message.error('上传文件大小不能超过 10MB!')
      }
      this.filename = file.name
      return isLt2M
    },
    handleSuccess(response, file, fileList) {
      this.$refs.QuestionFile.clearFiles()
      this.$notify({
        title: '上传成功',
        type: 'success',
        duration: 2500
      })
    },
    // 监听上传失败
    handleError(e, file, fileList) {
      const msg = JSON.parse(e.data)
      this.$notify({
        title: msg.message,
        type: 'error',
        duration: 2500
      })
      this.loading = false
    },
    getTemplate() {
      exportExcel('/question/exportQuestionTemplate', {
        fileName:'试题上传模板'
      });
    }
  }
}
</script>

<style lang="less" scoped>
.btn{
  float: left;
  margin: 10px 10px;
}
</style>
