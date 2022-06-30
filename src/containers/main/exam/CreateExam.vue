<template>
  <el-card>
    <div class="box">
     <el-form ref="form" label-width="80px">
      <el-form-item   label="班级">
       <el-select v-model="className" placeholder="请选择班级" @focus="findAllClass">
         <el-option v-for="(clazz, index) of classes" :label="clazz" :value="clazz" :key="index"></el-option>
       </el-select>
      </el-form-item>
    <el-form-item  label="考试名称">
      <el-input v-model="examName"></el-input>
    </el-form-item>
      <el-form-item  label="试卷">
      <el-select v-model="paperId" placeholder="请选择试卷" @focus="findAllPaper">
        <el-option v-for="(paper, index) of papers" :label="paper.title" :value="paper.id" :key="index"></el-option>
      </el-select>
    </el-form-item>
       <el-form-item label="考试时间">
         <el-col>
           <div class="block">
             <el-date-picker
               v-model="examTime"
               type="datetimerange"
               start-placeholder="开始时间"
               end-placeholder="结束时间"
             >
             </el-date-picker>
           </div>
         </el-col>
       </el-form-item>
    <el-button class="btn" type="primary" @click="submitForm">确定创建</el-button>
        </el-form>
    </div>
  </el-card>
</template>

<script>
import httpServer from "../../../components/httpServer/httpServer";

export default {
     data() {
      return {
        classes:[],
        papers:[],
        paperId:'',
        paperTitle:'',
        className:'',
        examName:'',
        examTime:''
      }
    },
    methods:{
      submitForm() {
        console.log(this.examTime)
        httpServer({
          url:'exam/create_exam'
        }, {
          clazzName:this.className,
          papersId:this.paperId,
          startTime:this.examTime[0],
          endTime:this.examTime[1],
          userId:parseInt(localStorage.getItem('userId')),
          examTitle:this.examName
        })
      },
      findAllClass() {
          httpServer({
            url:'/exam/getAllClassName'
          }).then((res)=>{
            this.classes = res.data.data
          })
      },
      findAllPaper(){
          httpServer({
            url:'/exam/get_papers'
          }).then((res)=>{
            this.papers = res.data.data
          })
      }
    }
}
</script>

<style lang="less" scoped>
    .box{
        margin: 10px;
    }
    .btn{
        margin: 10px 10px;
        float: right;
    }
</style>
