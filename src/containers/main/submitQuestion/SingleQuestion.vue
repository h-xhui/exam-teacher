<template>
  <div>
    <el-tabs @tab-click="handleClick" type="border-card">
      <!-- 单选题块 -->
      <el-tab-pane label="单选题">
        <question-form></question-form>
      </el-tab-pane>
      <el-tab-pane label="多选题">
        <question-form2></question-form2>
      </el-tab-pane>
      <el-tab-pane label="判断题">
        <question-form3></question-form3>
      </el-tab-pane>
      <el-tab-pane label="填空题">
        <question-form4></question-form4>
      </el-tab-pane>
      <el-tab-pane label="简答题">
        <question-form5></question-form5>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import httpServer from "../../../components/httpServer/httpServer";
import questionForm from "./QuestionForm";
import questionForm2 from "./QuestionForm2";
import questionForm3 from "./QuestionForm3";
import questionForm4 from "./QuestionForm4";
import questionForm5 from "./QuestionForm5";
export default {
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
  components : {
    questionForm,
    questionForm2,
    questionForm3,
    questionForm4,
    questionForm5
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
          console.log(res.data.data);
        })
      }
    }
  },
  created(){

  }


}
</script>

<style lang="less" scoped>
.el-input{
  width: 90%;
}
.btn1{
  float: right;
  margin-right: 100px;
}

</style>
