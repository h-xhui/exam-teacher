<template>
  <div>
    <el-row>
      <el-button type="warning" icon="el-icon-arrow-left" @click="back" class="backBtn">
        返回
      </el-button>
    </el-row>
    <el-row>
      <el-card>
        <div slot="header" class="clearfix">
          <span>学生答卷</span>
        </div>
        <!-- 题目区块 -->
        <div class="box" v-for="(item,index) in testForm" :key="index" >
          <el-button style="margin-right:10px" size="mini" round>第{{index+1}}题</el-button>
          <span>({{item.score}}分)</span>
          <div class="box2">
            {{item.content}}
            <ul class="box3" style="list-style:none">
              <li v-for="(item2,i) in item.choice" :key="i">{{item2}}</li>
            </ul>
          </div>
            <h4 >学生答案：</h4>
            <div>{{item.queAnswer}}</div>
            <h4 style="color:red">正确答案：</h4>
            <div>{{item.answer}}</div>
            <div style="margin-left:80%">
              <span>学生得分: </span>
              <span class="score" v-text="item.queScore"></span>
              <!--            <span  style="color:blue"> ({{item.queScore}}分)</span>-->
          </div>
          <el-divider></el-divider>
        </div>
      </el-card>
    </el-row>
<!--    <el-row>-->
<!--      <el-button type="primary" @click="submit" class="submitBtn">-->
<!--        阅卷完成-->
<!--      </el-button>-->
<!--    </el-row>-->
  </div>
</template>

<script>
import httpServer from "../../../components/httpServer/httpServer";

export default {
  data(){
    return{
      scoreForm:[],
      testForm:this.$route.params.index3
    }
  },
  methods:{
    back(){
      this.$router.push({
        name:'showStuExam',
        params:{
          index2:this.$route.params.index2,
          index1:this.$route.params.index1,
          examId:this.$route.params.examId
        }
      });
    },
    submit() {
      let questionId = [];
      for (let i = 0; i < this.testForm.length; ++i) {
        questionId.push(this.testForm[i].id)
      }
      httpServer({
        url:'/paper/marking'
      }, {
        examId:this.$route.params.examId,
        userId:parseInt(localStorage.getItem('userId')),
        questions:JSON.stringify(questionId),
        score:JSON.stringify(this.scoreForm)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.box{
  .score{
    width: 120px;
    margin-top:10px;

  }
  margin: 10px 10px;
  .box2{
    margin: 10px 10px;
    .box3{
      margin: 10px 10px;

    }
  }
}
.backBtn{
  float: left;
  margin: 10px 10px;
}
.submitBtn{
  float: right;
  margin: 10px 10px;
}
</style>
