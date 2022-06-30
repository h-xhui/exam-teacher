<template>
  <div>
    <el-form :model="questionForm" :rules="questionRules" ref="questionFormRef" label-width="80px">
      <el-form-item label="知识点" prop="tag">
        <el-select v-model="questionForm.tagId" placeholder="请选择知识点" @focus="findAllTag">
          <el-option v-for="(tag, index) of tags" :label="tag.name" :value="tag.id" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="题干"  prop="content" >
        <el-input type="textarea" v-model="questionForm.content"></el-input>
      </el-form-item>
      <el-button class="btn1" type="primary" @click="onSubmit">保存</el-button>
    </el-form>
  </div>
</template>

<script>
import httpServer from "../../../components/httpServer/httpServer";

export default {
  name: "QuestionForm5",
  data(){
    return{
      // 问题表单
      questionForm:{
        tagId:'',
        content:'',
      },
      tags:[],
      // 答案表单
      answer: '',
      //问题表单验证规则
      questionRules: {
        tagId: [
          { required: true, message: '请选择知识点', trigger: 'change' },
        ],
        content:[
          {
            required: true, message: '请输入题干', trigger: 'blur'
          },
          { min: 1,message: '题干不能为空！', trigger: 'blur' }
        ],
      }

    }
  },
  methods:{
    // 保存按钮事件
    onSubmit(){
      this.$refs.questionFormRef.validate( async valid=>{
        if(!valid)return
        httpServer({
          url : '/question/question_input'
        },{
          userId:1,
          tag:this.questionForm.tagId,
          type:5,
          content:this.questionForm.content,
          tagId:this.questionForm.tagId
        }).then((res) => {
          if (res.code === '00000') {
            this.$message.success('保存成功!')
          }
        })
      })
    },
    //清除表单
    deleteForm(){
      this.$refs.questionFormRef.resetFields()
    },
    findAllTag() {
      if (this.tags.length === 0) {
        httpServer({
          url:'/tag/tag_getList',
          method:'get'
        },{
        }).then((res)=>{
          this.tags = res.data.data;
          console.log(res.data.data);
        })
      }
    }
  },
}
</script>

<style scoped>
.el-input{
  width: 90%;
}
.btn1{
  float: right;
  margin-right: 100px;
}
</style>


