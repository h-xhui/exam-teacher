<template>
  <div>
    <el-form :model="questionForm" :rules="questionRules" ref="questionFormRef" label-width="80px">
      <el-form-item label="知识点" prop="tagId">
        <el-select v-model="questionForm.tagId" placeholder="请选择知识点" @focus="findAllTag">
          <el-option v-for="(tag, index) of tags" :label="tag.name" :value="tag.id" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="题干"  prop="content" >
        <el-input type="textarea" v-model="questionForm.content"></el-input>
      </el-form-item>

      <el-form-item label="选项A" prop="A">
        <el-input v-model="questionForm.a">
          <el-radio v-model="answerForm.answer" slot="append" label="A">正确答案</el-radio>
        </el-input>
        <el-button @click="deleteAnswerA"><i class="el-icon-delete"></i></el-button>
      </el-form-item>

      <el-form-item label="选项B" prop="B">
        <el-input v-model="questionForm.b">
          <el-radio  v-model="answerForm.answer" slot="append" label="B">正确答案</el-radio>
        </el-input>
        <el-button @click="deleteAnswerB"><i class="el-icon-delete"></i></el-button>
      </el-form-item>

      <el-form-item label="选项C" prop="C">
        <el-input v-model="questionForm.c">
          <el-radio  v-model="answerForm.answer" slot="append" label="C">正确答案</el-radio>
        </el-input>
        <el-button @click="deleteAnswerC"><i class="el-icon-delete"></i></el-button>
      </el-form-item>

      <el-form-item label="选项D" prop="D">
        <el-input v-model="questionForm.d">
          <el-radio  v-model="answerForm.answer" slot="append" label="D">正确答案</el-radio>
        </el-input>
        <el-button @click="deleteAnswerD"><i class="el-icon-delete"></i></el-button>
      </el-form-item>

      <el-button class="btn1" type="primary" @click="onSubmit">保存</el-button>
    </el-form>
  </div>
</template>

<script>
import httpServer from "../../../components/httpServer/httpServer";

export default {
  name: "QuestionForm",
  data(){
    return{
      // 问题表单
      questionForm:{
        tagId:'',
        content:'',
        a:'',
        b:'',
        c:'',
        d:'',
      },
      tags:[],
      // 答案表单
      answerForm:{
        answer:[],
        tkanswer:''
      },
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
      let ans = ''
      for (let i = 0; i < this.answerForm.answer.length; ++i) {
        ans += this.answerForm.answer[i]
      }
      this.$refs.questionFormRef.validate( async valid=>{
        if(!valid)return
        httpServer({
          url : '/question/question_input'
        },{
          userId:1,
          tag:this.questionForm.tagId,
          answer: ans,
          type:1,
          content:this.questionForm.content,
          a:this.questionForm.a,
          b:this.questionForm.b,
          c:this.questionForm.c,
          d:this.questionForm.d,
          tagId:this.questionForm.tagId
        }).then((res) => {
          if (res.code === '00000') {
            this.$message.success('保存成功!')
          }
        })
      })
    },
    // 删除按钮事件
    deleteAnswerA(){
      this.questionForm.A='';
    },
    deleteAnswerB(){
      this.questionForm.B='';
    },
    deleteAnswerC(){
      this.questionForm.C='';
    },
    deleteAnswerD(){
      this.questionForm.D='';
    },
    //清除表单
    deleteForm(){
      this.$refs.questionFormRef.resetFields()
    } ,
    // 每次点击标签触发事件
    handleClick(){
      this.deleteForm()
      this.answerForm.answer=[]
      this.answerForm.tkanswer=''
    },
    findAllTag() {
      if (this.tags.length === 0) {
        httpServer({
          url:'/tag/tag_getList',
          method:'get'
        },{
        }).then((res)=>{
          this.tags = res.data.data;
          //console.log(res.data.data);
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
